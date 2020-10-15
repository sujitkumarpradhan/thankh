import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Link, Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import FAQ from "./components/pages/FAQ";
import Video from "./components/pages/Video";

const client = new ApolloClient({
    link: createHttpLink({
        uri:
            "https://wbirdfd6ofeenifgo722poml3a.appsync-api.us-east-1.amazonaws.com/graphql",
        headers: {
            "x-api-key": "da2-lyj3azjx55ajnbk4wta2zb4hai"
        }
    }),
    cache: new InMemoryCache()
});



ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/video" component={Video} />
                <Route path={"/home"} component={Home} />
                <Route path={"/about"} component={About} />
                <Route path={"/faq"} component={FAQ} />
               
            </Switch>
       
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
// registerServiceWorker();
