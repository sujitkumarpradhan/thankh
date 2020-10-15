import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Link, Route, Switch } from "react-router-dom";
import Create from "./Components/pages/create.js";
import Upload from "./Components/pages/upload.js";

import { BrowserRouter } from "react-router-dom";
import upload from "./Components/pages/upload.js";
const client = new ApolloClient({
    link: createHttpLink({
        uri:
            "https://a4dbb7grwjdwtadxohnpduwxzm.appsync-api.us-east-1.amazonaws.com/graphql",
        headers: {
            "x-api-key": "da2-ifhi74z4dfdjvkedsqq2lwvqnm"
        }
    }),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Route exact path="/" component={Create} />
            <Route exact path="/home" component={Create} />
            <Route exact path="/upload" component={Upload} />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
