import React, {Component} from 'react'

class LoginForm extends Component {
    constructor () {
        super()

        this.state = {
            form: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e) {
        const name = e.target.dataset.name
        const value = e.target.value
        const newObj = {}
        newObj[name] = value
        this.setState({
            form: Object.assign(this.state.form, newObj)
        })
    }

    handleSubmit() {
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            body: JSON.stringify(this.state.form),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
        .then(response => {
            if(response.success && response.token){
                localStorage.setItem('token', response.token)
                this.props.setLoggedIn()
            }
        }).catch(err => console.log(err))
    }


    render () {
        return (
            <form>
                <h1>Create Pokemon</h1>
            <div className="form-group">
              <label htmlFor="input-pokename">Pokemon name</label>
              <input data-name="pokemonName" type="text" onChange={this.handleChange} className="form-control" id="input-pokemon-name" placeholder="Enter pokemon name" />
            </div>
            <div className="form-group">
              <label htmlFor="input-pokeImg">Image URL</label>
              <input data-name="input-pokeImg" type="text" onChange={this.handleChange} className="form-control" id="input-pokeImg" placeholder="Image" />
            </div>
            <div className="form-group">
              <label htmlFor="input-info">Information</label>
              <input data-name="pokemonInfo" type="text" onChange={this.handleChange} className="form-control" id="input-info" placeholder="Info" />
            </div>
            <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
      </form>
        )
    }
}
    


    
export default LoginForm