import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { CardGroup } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import Mymodel from './component/BookFormModal';
import { tSImportEqualsDeclaration } from '@babel/types';
import UpdateModal from './component/updateModal';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      email: '',
      show: false,
      hide: true,
      showUpdate: false,
      updateBookId: 0
    }
  }

  addBook = async () => {
    await this.setState({
      show: !this.state.show

    })
  }

  hideBook = async () => {
    await this.setState({

      show: !this.state.show
    })
  }

  hideBookUpdate = async () => {
    await this.setState({

      showUpdate: !this.state.showUpdate
    })
  }


  addNewBookSubmit = async (event) => {
    event.preventDefault();




    let bookData = {
      bookName: event.target.bookName.value,
      bookStatus: event.target.bookStatus.value,
      bookDesc: event.target.bookDesc.value,
      imgUrl: event.target.imgUrl.value,
      email: this.props.email
    }

    console.log(bookData)
    let newDataSend = await axios.post(`${process.env.REACT_APP_MONGO_DB}addNewBook`, bookData)

    // await this.setState({
    //   data: newDataSend.data
    // })

    const data2 = newDataSend.data[0];
    await this.setState({
      data: data2.books
    })

    await console.log(newDataSend)

    this.hideBook()
  }

  componentDidMount = async () => {
    // console.log('vcbksjdljclksjdknlm')
    const { user } = this.props.auth0;


    let url = `${process.env.REACT_APP_MONGO_DB}books?email=${this.props.email}`
    console.log(this.props.email)
    let localData = await axios.get(url)

    console.log(localData.data[0]);

    const data2 = localData.data[0];
    await this.setState({
      data: data2.books
    })

    console.log(this.state.data.books)

  }



  deleteFunc = async (index) => {
    let deletUrl = `${process.env.REACT_APP_MONGO_DB}deleteMyBook`
    let paramsEmail = {
      email: this.props.email
    }

    let newDataSend = await axios.delete(`${deletUrl}/${index}`, { params: paramsEmail})

    const data2 = newDataSend.data[0];
    await this.setState({
      data: data2.books
    })

    await console.log(newDataSend)
  }


  updateDataFunc = async (event) => {
    event.preventDefault();

    
    let updateUrl = `${process.env.REACT_APP_MONGO_DB}updateFun`

    let paramsEmail = {
      email: this.props.email,
      url: event.target.imgUrlUpdate.value,
      desc: event.target.bookDescUpdate.value,
      status: event.target.bookStatusUpdate.value,
      name: event.target.bookNameUpdate.value
    }

    let newDataSend = await axios.put(`${updateUrl}/${this.state.updateBookId}`, { params:paramsEmail  })

    console.log(this.state.updateBookId)
    const data2 = newDataSend.data[0];
    await this.setState({
      data: data2.books
    })

    await console.log(newDataSend)

    this.hideBookUpdate()
  } 

  updateFun = async (index) => {
    
    await this.setState({
      updateBookId: index,
      showUpdate: !this.state.showUpdate
    })
    
  }

  render() {
    const { user, isAuthenticated } = this.props.auth0;

    // this.props.rederData
    return isAuthenticated && (
      <div style={{ marginRight: "10%", marginLeft: "10%" }} >
        <Mymodel addNewBookSubmit={this.addNewBookSubmit} onHide={this.hideBook} show={this.state.show} />
        
        <UpdateModal updateFunc={this.updateDataFunc} hideBookUpdate={this.hideBookUpdate} showUpdate={this.state.showUpdate} />

        <div style={{ textAlign: "center" }}>

          <h2> {this.props.userName} </h2>
          <Button onClick={this.addBook}> Add Book </Button>
         
        </div>

        <Row>
          {/* <Col> */}
          {
            this.state.data.map((item, index) => {
              return (
                <Card style={{ width: '31%', margin: '1%', background: "#EEF3F6" }}>
                  <Card.Header>
                    <Card.Title>
                      {item.name}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body style={{ background: "#C9DBE6" }}>

                    <Card.Text>
                      {item.status}
                    </Card.Text>

                    <Card.Text>
                      {item.description}
                      {index}
                    </Card.Text>

                  </Card.Body>

                  <Card.Footer>
                    <button style={{ float: 'left', background: '#DD2222', color: 'wheat' }} onClick={
                      async () => { this.deleteFunc(index) }}> Remove </button>

                    <button style={{ float: 'right', background: '#0064FF', color: 'wheat' }} onClick={
                      async () => {this.updateFun(index)}
                    }> Update </button>
                  </Card.Footer>
                </Card>
              )
            })
          }
          {/* </Col> */}
        </Row>
      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
