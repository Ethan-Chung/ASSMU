// Joi is used to define a schema (simple object). In this object we add all of our properties and their validation requirements.
import Joi from 'joi-browser';
import Form from './Common/form';

// inherits Form (so we can use all of its methods)
class LoginForm extends Form {
    state = {
        // set to empty strings because null and undefined cannot be used as values of controlled elements and components
        data: { username: '', password: '' },
        // using object instead of array bc it is easier to find the errors for a given input field
        errors: {}
    };

    // this schema does not have to be part of the state because it's not supposed to change
    // fluent way to define validation rules. 
    // .label assigns us a friendly name to this field
    schema = {   
        username: Joi.string().required().label('Username'), 
        password: Joi.string().required().label('Password') 
    };
    
    doSubmit = () => {
        // call the server
        console.log("Submitted");
    }

    render() {   
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={ this.handleSubmit }>
                    {/* render our username field */}
                    { this.renderInput('username', 'Username') }
                    
                    {/* render our password field. The third argument tells the type of input so no clear text */}
                    { this.renderInput('password', 'Password', 'password') }

                    {/* render our login button */}
                    { this.renderButton('Login') }
                </form>
            </div>
        );
    }
}
 
export default LoginForm;