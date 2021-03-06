import React from 'react'
import GraphiQL from 'graphiql'
// import { IntrospectionQuery } from 'graphql'
import { buildClientSchema, getIntrospectionQuery, parse } from 'graphql'
import type { GraphQLSchema } from 'graphql'
import GraphiQLExplorer from 'graphiql-explorer'
import {
    Modal,
    Button,
    InputGroup,
    FormControl,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap'

import { makeDefaultArg, getDefaultScalarArgValue } from './CustomArgs'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'graphiql/graphiql.css'
import './App.css'

let endPoint: string
let token: string
let authenticationMethod: string
const availableAuthenticationMethods = ['Bearer', 'Basic', 'Digest']

function fetcher(params: unknown) {
    if (authenticationMethod === 'Bearer') {
        if (!token) return Promise.resolve('')
        return fetch(endPoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(params),
        })
            .then(function (response) {
                return response.text()
            })
            .then(function (responseBody) {
                try {
                    return JSON.parse(responseBody)
                } catch (e) {
                    return responseBody
                }
            })
    } else {
        console.log(
            `'Authentication Method "${authenticationMethod}" not yet implemented!`
        )
        return Promise.resolve('') // TODO: Implement other auth methods
    }
}

const DEFAULT_QUERY = `# shift-option/alt-click on a query below to jump to it in the explorer
# option/alt-click on a field in the explorer to select all subfields
query MyQuery {
    organization(slug: "") {
      name
      teams(first: 10) {
        edges {
          node {
            name
          }
        }
      }
    }
  }`

type State = {
    schema?: GraphQLSchema
    query?: string
    explorerIsOpen?: boolean
    show?: boolean
    token?: string
    endPoint?: string
    authenticationMethod?: string
}

class App extends React.Component<unknown, State> {
    private _graphiql: GraphiQL
    state: State = {
        query: DEFAULT_QUERY,
        explorerIsOpen: true,
        show: false,
        token: '',
        endPoint: '',
        authenticationMethod: availableAuthenticationMethods[0],
    }

    constructor(props: unknown) {
        super(props)
        this._graphiql = new GraphiQL({ fetcher })
        this.handleShowConfig = this.handleShowConfig.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleExit = this.handleExit.bind(this)
    }

    handleSave(): void {
        authenticationMethod = this.state?.authenticationMethod || ''
        token = this.state?.token || ''
        endPoint = this.state?.endPoint || ''
        if (authenticationMethod !== 'Bearer') return
        if (token.length < 40) return
        if (endPoint.length < 10) return
        this.setState({ show: false })
        this.updateSchema()
    }

    handleShowConfig(): void {
        this.setState({ show: true })
    }

    handleExit(): void {
        this.handleSave()
    }

    onChange(event: any): void {
        // Intended to run on the change of every form component
        event.preventDefault()
        console.log('event.currentTarget.name', event.currentTarget.name)
        console.log('event.currentTarget.value', event.currentTarget.value)

        this.setState({
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }

    updateSchema(): void {
        if (token)
            fetcher({
                query: getIntrospectionQuery(),
            }).then((result) => {
                const editor = this._graphiql.getQueryEditor()
                editor.setOption('extraKeys', {
                    ...(editor.options.extraKeys || {}),
                    'Shift-Alt-LeftClick': this._handleInspectOperation,
                })
                if (result.data)
                    this.setState({ schema: buildClientSchema(result.data) })
            })
    }

    componentDidMount(): void {
        if (!token) this.handleShowConfig()
        else this.updateSchema()
    }

    _handleInspectOperation = (
        cm: any,
        mousePos: { line: number; ch: number }
    ) => {
        const parsedQuery = parse(this.state.query || '')

        if (!parsedQuery) {
            console.error("Couldn't parse query document")
            return null
        }

        const token = cm.getTokenAt(mousePos)
        const start = { line: mousePos.line, ch: token.start }
        const end = { line: mousePos.line, ch: token.end }
        const relevantMousePos = {
            start: cm.indexFromPos(start),
            end: cm.indexFromPos(end),
        }

        const position = relevantMousePos

        const def = parsedQuery.definitions.find((definition) => {
            if (!definition.loc) {
                console.log('Missing location information for definition')
                return false
            }

            const { start, end } = definition.loc
            return start <= position.start && end >= position.end
        })

        if (!def) {
            console.error(
                'Unable to find definition corresponding to mouse position'
            )
            return null
        }

        const operationKind =
            def.kind === 'OperationDefinition'
                ? def.operation
                : def.kind === 'FragmentDefinition'
                ? 'fragment'
                : 'unknown'

        const operationName =
            def.kind === 'OperationDefinition' && !!def.name
                ? def.name.value
                : def.kind === 'FragmentDefinition' && !!def.name
                ? def.name.value
                : 'unknown'

        const selector = `.graphiql-explorer-root #${operationKind}-${operationName}`

        const el = document.querySelector(selector)
        el && el.scrollIntoView()
    }

    _handleEditQuery = (query: string | undefined): void => {
        query = query ? query : ''
        this.setState({ query })
    }

    _handleToggleExplorer = (): void => {
        this.setState({ explorerIsOpen: !this.state.explorerIsOpen })
    }

    handleSelectedMethod = (eventKey): void => {
        this.setState({ authenticationMethod: eventKey })
        authenticationMethod = this.state.authenticationMethod!
    }

    render() {
        const { query, schema } = this.state
        return (
            <div className="graphiql-container">
                <Modal
                    show={this.state.show}
                    onHide={this.handleSave}
                    onExit={this.handleExit}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <FormControl
                                name="endPoint"
                                placeholder="Enter GraphQL API Endpoint"
                                aria-label="Enter GraphQL API Endpoint"
                                aria-describedby="basic-addon2"
                                value={this.state.endPoint}
                                onChange={(e) => this.onChange(e)}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup className="mb-3">
                            <DropdownButton
                                id="authenticationMethods"
                                title={this.state.authenticationMethod}
                                onSelect={this.handleSelectedMethod}
                            >
                                {availableAuthenticationMethods.map(
                                    (method, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            eventKey={method}
                                        >
                                            {method}
                                        </Dropdown.Item>
                                    )
                                )}
                            </DropdownButton>
                            <FormControl
                                name="token"
                                placeholder="Enter GraphQL API Access Token"
                                aria-label="Enter GraphQL API Access Token"
                                aria-describedby="basic-addon2"
                                value={this.state.token}
                                onChange={(e) => this.onChange(e)}
                            />
                        </InputGroup>
                        <p className="text-muted">
                            <small>
                                Your token will be only shared with the GraphQL
                                endpoint.
                            </small>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSave}>
                            Continue
                        </Button>
                    </Modal.Footer>
                </Modal>
                <GraphiQLExplorer
                    schema={schema}
                    query={query}
                    onEdit={this._handleEditQuery}
                    onRunOperation={(operationName: any) =>
                        this._graphiql.handleRunQuery(operationName)
                    }
                    explorerIsOpen={this.state.explorerIsOpen}
                    onToggleExplorer={this._handleToggleExplorer}
                    getDefaultScalarArgValue={getDefaultScalarArgValue}
                    makeDefaultArg={makeDefaultArg}
                />
                <GraphiQL
                    ref={(ref) => (this._graphiql = ref!)}
                    fetcher={fetcher}
                    schema={schema}
                    query={query}
                    response="No results yet.."
                    onEditQuery={this._handleEditQuery}
                >
                    <GraphiQL.Toolbar>
                        <GraphiQL.Button
                            onClick={() => this._graphiql.handlePrettifyQuery()}
                            label="Prettify"
                            title="Prettify Query (Shift-Ctrl-P)"
                        />
                        <GraphiQL.Button
                            onClick={() => this._graphiql.handleToggleHistory()}
                            label="History"
                            title="Show History"
                        />
                        <GraphiQL.Button
                            onClick={this._handleToggleExplorer}
                            label="Explorer"
                            title="Toggle Explorer"
                        />
                        <GraphiQL.Button
                            onClick={this.handleShowConfig}
                            label="Configuration"
                            title="Change Configuration"
                        />
                    </GraphiQL.Toolbar>
                </GraphiQL>
            </div>
        )
    }
}

export default App
