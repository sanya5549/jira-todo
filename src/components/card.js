import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';

//card component
export class JCard extends Component {

    render () {

        const card = this.props.card
        return (
            //semantic reacct card
            <div className="card">
                <Card>
                    <Card>
                        <Card.Content>
                        <Card.Header>{card.title}</Card.Header>
                        <Card.Meta>{card.date}</Card.Meta>
                        <Card.Description>
                            {card.description}
                        </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            {/* suppying whole card to the edit click function */}
                            <Button basic color='blue'onClick={()=> this.props.handleEditClick({...card})}> 
                                Edit
                            </Button>
                            {/* supplying the card id to be deleted to the function */}
                            <Button basic color='red' onClick={() => this.props.handleRemoveCard(card.id)}>
                                Delete
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}