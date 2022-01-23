import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, from} from '@apollo/client';
import {setContext} from '@apollo/client/link/context'

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer${token}` : "",
        }
    }
});
const link = from([
    new createHttpLink({uri: process.env.REACT_APP_BACKEND_URL})
])
const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    findAllFurniture: {
                        keyArgs: false,
                        merge(existing, incoming) {
                            if (!incoming) {
                                return existing;
                            }
                            if (!existing) {
                                return incoming;
                            }
                            return {
                                __typename: "FurnitureConnection",
                                allFurniture: [
                                    ...existing.allFurniture,
                                    ...incoming.allFurniture
                                ],
                                cursor: incoming.cursor,
                                hasMore: incoming.hasMore
                            };
                        }
                    },
                    findAllMaterial: {
                        keyArgs: false,
                        merge(existing, incoming) {
                            if (!incoming) {
                                return existing;
                            }
                            if (!existing) {
                                return incoming;
                            }
                            return {
                                __typename: "MaterialConnection",
                                materials: [
                                    ...existing.materials,
                                    ...incoming.materials
                                ],
                                cursor: incoming.cursor,
                                hasMore: incoming.hasMore
                            };
                        }
                    },
                    findAllRecipes: {
                        keyArgs: false,
                        merge(existing, incoming) {
                            if (!incoming) {
                                return existing;
                            }
                            if (!existing) {
                                return incoming;
                            }
                            return {
                                __typename: "RecipeConnection",
                                recipes: [
                                    ...existing.recipes,
                                    ...incoming.recipes,
                                ],
                                cursor: incoming.cursor,
                                hasMore: incoming.hasMore
                            };
                        }
                    }
                }
            }
        }
    }),
    link: authLink.concat(link),  
})

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();