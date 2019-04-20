import React, {Component} from 'react'
import {Button, Segment} from 'semantic-ui-react';
import {JCard} from './card';
import './styles/card.css'

//grid colum component
export class GridColumn extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        //if it is the first column then only add button present
        let addButton = null;
        if(this.props.addable) {
            addButton = (
                <div><Button color="blue" align="center" onClick={this.props.handleAddCardClick}>Add Card</Button></div>
            );
        } 

        //if there number of cards come out to be null initialize it with empty list.
        let cards = this.props.cards;
        if (cards === null || cards === undefined) cards = [];
        
        //defining the segment
        return (
            <div>
                <Segment className="segment">
                    <h1>{this.props.title}</h1><hr/>
                    {cards.map((card, ind) => {
                        //adding properties to remove and edit card 
                        return <JCard key={ind} handleRemoveCard={this.props.handleRemoveCard} handleEditClick={this.props.handleEditClick} card={card} />
                    })}
                    {addButton}
                </Segment>
            </div>
        );
    }
}
