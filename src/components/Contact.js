import React from "react";

class Contact extends React.Component {
    constructor(props) {
        const current = new Date();
        super(props);
        this.state = {
            name: '',
            email: '',
            date: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
            comment: ''
        };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
  
    handleSubmit (event) {
        const templateId = 'template_ussdsrj';
        this.sendFeedback(templateId, {message:this.state.comment, from_name: this.state.name, reply_to: this.state.email});
        document.getElementByID("myForm").reset();
    }
    
      sendFeedback (templateId, variables) {
        window.emailjs.send(
          'service_dhcb53o', templateId,
          variables
          ).then(res => {
            alert('Email successfully sent!')
          })
          // Handle errors here however you like, or use a React error boundary
          .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      }
  
    render() {
      return (
        <div>
            <h1 className = "tabHeader">Contact</h1>
            <div className="formGrid">
                <div className="form">
                    <h1> Questions, comments, concerns?</h1>
                    <form id = "myForm" onSubmit = {this.handleSubmit}>
                        <label> 
                            Name:
                            <input
                            name = "name" 
                            type = "text"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            required
                        /> 
                        </label>

                        <label> 
                            School E-mail: 
                            <input 
                            name = "email" 
                            type = "text"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            required
                            />
                        </label>


                        <label> 
                            Comments: 
                            <textarea
                            name = "comment" 
                            value={this.state.comment} 
                            onChange={this.handleInputChange}
                            required
                            />
                        </label>

                        <input type="button" value="Submit" onClick={this.handleSubmit}/>
                    </form>
                </div>
            </div>
        </div>
      );
    }
  }
 
export default Contact;