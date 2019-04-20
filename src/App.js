import React, { Component } from 'react';
import { Grid, Modal, Button, Form , Container} from 'semantic-ui-react';
import { GridColumn } from './components/grid-column';
import './components/styles/app.css'
import {addCard as addCardAction, removeCard as removeCardAction, editCard as editClickAction} from './actions';
import {connect} from 'react-redux'
import uuid4 from 'uuid/v4';

//add modal component
class AddModal extends Component {
  //initializing properties and state
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
    // this.resetState()
  }


  //to empty the modal value on reopening
  resetState = () => {
    this.setState({
      title: '',
      description: ''
    })
  }

  handleStateChangeBeforeAddCard = () => {
    const stateCopy = {...this.state};
    this.resetState();
    this.props.handleAddCard(stateCopy);
  }


  render () {
    const {open, close, handleAddCard} = this.props;
    // this.resetState();
    return (
      <Modal size="small" open={open} onClose={close}>
        <Modal.Header>Add New Card</Modal.Header>
        <Modal.Content>
            <Form>
              <Form.Field>
                <label>Title</label>
                <input placeholder="title"
                  value={this.state.title}
                  onChange={e => this.setState({...this.state, title: e.target.value})}/>
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <input placeholder="Description"
                  value={this.state.description}
                  onChange={e => this.setState({...this.state, description: e.target.value})}/>
              </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close}>Cancel</Button>
          <Button positive icon='checkmark' onClick={this.handleStateChangeBeforeAddCard}
            labelPosition='right' content='Add' />
        </Modal.Actions>
      </Modal>
    )
  }
}

//edit modal component
class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }

  componentWillReceiveProps = (newProps) => {
    console.log(newProps.card)
    this.setState({...newProps.card});
  }

  render(){

    const {open, close, handleEditCardSubmit, card} = this.props;
    return(
      <Modal size="small" open={open} onClose={close}>
        <Modal.Header>Edit your card</Modal.Header>
        <Modal.Content>
            <Form>
              <Form.Field>
                <label>Title</label>
                <input placeholder="title"
                  value={this.state.title}
                  onChange={e => this.setState({...this.state, title: e.target.value})}/>
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <input placeholder="Description"
                  value={this.state.description}
                  onChange={e => this.setState({...this.state, description: e.target.value})}/>
              </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close}>Cancel</Button>
          <Button positive icon='checkmark' onClick={() => handleEditCardSubmit({...this.state})}
            labelPosition='right' content='Edit' />
        </Modal.Actions>
      </Modal>
    
    ) 
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addModal: {
        open: false
      },
      editModal: {
        open: false,
        card: {}
      }
    }
  }

  //function to handle add card click
  handleAddCardClick = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      addModal: {open: true}
    })
  }

  //function to handle add card submit
  handleAddCardSubmit = (card) => {
    card.id = uuid4()
    card.date = new Date().toJSON().slice(0, 10);
    this.props.addCard(card);
    this.setState({
      ...this.state,
      addModal: {open: false}
    })
  }

  //funciton to close addmodal
  addModalClose = () => {
    this.setState({
      ...this.state,
      addModal: {
        open: false
      }
    })
  }

  //funciton to close editmodal
  editModalClose = () => {
    this.setState({
      ...this.state,
      editModal: {
        open: false,
        card: {}
      }
    })
  }

  //funciton to handle deleting a card
  handleRemoveCard = (cardId) => {
    this.props.removeCard(cardId)
  }

  //function to handle edit click
  handleEditClick = (card) => {
    this.setState({
      ...this.state,
      editModal: {
        open: true,
        card: {...card}
      }
    })
  }

  //funciton to handle edit card submit
  handleEditCardSubmit = (card) => {
    this.props.editCard({...card});
    this.editModalClose()
  }


  render() {
    return (
      <div className="App">
        <Container>
          <h1 align="center">TODO LIST</h1>
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <GridColumn title="All" addable={true} handleAddCardClick={this.handleAddCardClick} handleEditClick={this.handleEditClick}
                  handleRemoveCard={this.handleRemoveCard} cards={[...this.props.all]}/>
              </Grid.Column>
              <Grid.Column>
                <GridColumn title="ToDo" addable={false} handleRemoveCard={this.handleRemoveCard} handleEditClick={this.handleEditClick} cards={[...this.props.todo]}/>
              </Grid.Column>
              <Grid.Column>
                <GridColumn title="In Progress" addable={false} handleRemoveCard={this.handleRemoveCard} handleEditClick={this.handleEditClick} cards={[...this.props.inProgress]}/>
              </Grid.Column>
              <Grid.Column>
                <GridColumn title="Done" addable={false} handleRemoveCard={this.handleRemoveCard} handleEditClick={this.handleEditClick} cards={[...this.props.done]}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <AddModal open={this.state.addModal.open}
            close={this.addModalClose} handleAddCard={this.handleAddCardSubmit}/>
          
          <EditModal open={this.state.editModal.open} card={this.state.editModal.card}
            close={this.editModalClose} handleEditCardSubmit={this.handleEditCardSubmit}/>
        </Container>  
      </div>
    );
  }
}

//to match the state to properties
const mapStateToProps = (state) => {
  return {...state}
}


// connecting reducer to react
//dispatching action
const mapDispatchToProps = (dispatch) => ({
  addCard: (card) => dispatch(addCardAction(card)),
  removeCard: (cardId) => dispatch(removeCardAction(cardId)),
  editCard: (card) => dispatch(editClickAction(card))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
