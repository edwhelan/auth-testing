import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const question = (await fetch(`http://localhost:5000/${params.questionId}/`)
      .then(r => r.json()));
    this.setState({
      question,
    });
  }
  render() {
    const { question } = this.state;
    if (question == null) return <p>loading...</p>;
    return (
      <div className='container'>
        <div className='row'>
          <div className='jumbotron col-12'>
            <h1 className='display-3'>{question.title}</h1>
            <p className='lead'>{question.description}</p>
            <hr className='my-4' />
            <p>Answers:</p>
            {
              question.answers.map((answer, idx) => (
                <p className='lead' key={idx}>{answer.answer}</p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

}
export default Question