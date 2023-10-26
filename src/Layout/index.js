import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom"
import Home from "../Home"
import Study from "../Study"
import CreateDeck from "../CreateDeck"
import EditCard from "../EditCard";
import EditDeck from "../EditDeck"
import AddCard from "../AddCard"
import Deck from "../Deck"


function Layout() {
  function TestDeck(){
    return (
      <h1>test deck</h1>
    )
  }
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path= "/decks/:deckId" exact component={Deck} />
        <Route path="/decks/:deckId/study" exact component={Study} />
        <Route path ="/decks/:deckId/edit" exact component={EditDeck} />
        <Route path ="/decks/new" exact component={TestDeck} />
        <Route path ="/decks/:deckId/cards/new" exact component={AddCard} />
        <Route path="/decks/:deckId/cards/:cardId/edit" exact component={EditCard} />
        <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
