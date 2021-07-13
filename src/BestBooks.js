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
import Mymodel from './component/model';
import { tSImportEqualsDeclaration } from '@babel/types';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      email: '',
      show: false,
      hide: true
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


  addNewBookSubmit = async (event) => {
    event.preventDefault();



    const bookData = {
      bookName: event.target.bookName.value,
      bookStatus: event.target.bookStatus.value,
      bookDesc: event.target.bookDesc.value,
      imgUrl: event.target.imgUrl.value
    }

    const newDataSend = await axios.post(`${REACT_APP_MONGO_DB}addNewBook`,bookData)

    await this.setState({
      data: newDataSend.data
    })
    
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

  render() {
    const { user, isAuthenticated } = this.props.auth0;

    // this.props.rederData
    return isAuthenticated && (
      <div >
        <Mymodel addNewBookSubmit={this.addNewBookSubmit} onHide={this.hideBook} show={this.state.show} />
        <Button onClick={this.addBook}> Add Book </Button>

        <h2> {this.props.email} </h2>
        {
          this.state.data.map(item => {
            return (
              <div>

                <Row xs={1} md={2} className="g-4">

                  <CardGroup>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title> {item.name} </Card.Title>
                        <Card.Text>
                          {item.status}
                        </Card.Text>

                        <Card.Text>
                          {item.description}
                        </Card.Text>

                        <Button> Remove </Button>
                      </Card.Body>
                    </Card>
                  </CardGroup>
                </Row>

              </div>


            )
          })
        }
      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
