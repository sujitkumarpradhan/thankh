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
import Presentation from "./Presentation";
import SFComment from "./SFComment";
import SendMailValidator from "./sendMailValidator";
import ClonePresentation from "./clonePresentation";

/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from "react-router-dom";
const client = new ApolloClient({
    link: createHttpLink({
        uri:
            "https://ghoaoclrurc4vf7sksofnxs2cy.appsync-api.us-east-2.amazonaws.com/graphql",
        headers: {
            "x-api-key": "da2-v6no6ouawzdehjjegs57u2bfwe",
        },
    }),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Route exact path="/" component={App} />
            <Route
                path={
                    "/presentation/:itemTab/:itemName/:itemID/:itemEvent/:itemSF"
                }
                component={Presentation}
            />
            <Route path={"/sfcomment/:itemID"} component={SFComment} />
            <Route
                path={"/sendMailValidator/:itemID"}
                component={SendMailValidator}
            />
            <Route
                path={"/clonepresentation/:itemID"}
                component={ClonePresentation}
            />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
