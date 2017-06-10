import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = {
    'watched': 'Assitido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class NewSeries extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genres: [],
            isLoading: false,
            redirect: false
        }
        this.saveSeries = this.saveSeries.bind(this)
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadGenres()
            .then((response) => {
                this.setState({
                    isLoading: false,
                    genres: response.data
                })
            })
    }

    saveSeries() {
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.saveSeries(newSeries)
            .then((res) => {
                this.setState({
                    redirect: '/series/' + this.refs.genre.value
                })
            })
    }

    render() {
        return (
            < div className='container' >
                <section className='intro-section'>
                    {this.state.redirect &&
                        <Redirect to={this.state.redirect} />
                    }
                    <h1> Nova série </h1>
                    <form>
                        Nome: <input type='text' ref='name' className='form-control' /> <br />
                        Status: <select ref='status' className='form-control'>
                            {Object
                                .keys(statuses)
                                .map(key => <option key={key} value={key} > {statuses[key]} </option>)
                            }
                        </select> <br />
                        Genero: <select ref='genre' className='form-control'>
                            {this.state.genres
                                .map(key => <option key={key} value={key} > {key} </option>)
                            }
                        </select> <br />
                        Comentários: <textarea ref='comments' className='form-control' /> <br />
                        <button type='button' onClick={this.saveSeries} > Salvar </button>
                    </form>
                </section>
            </div >
        )
    }
}

export default NewSeries