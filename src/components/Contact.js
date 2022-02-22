const Contact = () => {
    return ( 
        <div className="form">
            <h1> Questions, comments, concerns?</h1>
            <form>
                <label> Name: </label>
                <input 
                    type = "text"
                    required
                />

                <label> School E-mail: </label>
                <input 
                    type = "text"
                    required
                />

                <label> Date submission </label>
                <input 
                    type = "date"
                    required
                />

                <label> Comments: </label>
                <textarea 
                    required
                />

                <button> Submit </button>
            </form>
        </div>
     );
}
 
export default Contact;