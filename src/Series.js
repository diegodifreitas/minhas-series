import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import api from './Api'

const statuses = {
    'watched': 'Assitido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class Series extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            series: []
        }
        this.renderSeries = this.renderSeries.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.setState({ isLoading: true })
        api.loadSeriesByGenre(this.props.match.params.genre)
            .then((res) => {
                this.setState({
                    isLoading: false,
                    series: res.data
                })
            })
    }
    deleteSeries(id) {
        api.deleteSerie(id)
            .then((res) =>
                this.loadData()
            )

    }
    renderSeries(serie) {
        return (
            <div key={serie.id} className="item  col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {serie.name}</h4>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead">
                                    {serie.genre} / {statuses[serie.status]}</p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <Link className="btn btn-success" to={'/series-edit/' + serie.id } >Editar</Link>
                                <a className="btn btn-success" onClick={ () => this.deleteSeries(serie.id)} href="">Excluir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <section className="intro-section">
                <h1> Séries de {this.props.match.params.genre} </h1>
                {this.state.isLoading &&
                    <p>Carregando, aguarde...</p>
                }
                {
                   !this.state.isLoading && this.state.series.length === 0 &&
                    <div className='alert alert-info'> Nenhuma série cadastrada. </div>
                }
                <div id="series" className="row list-group">
                    {!this.state.isLoading &&
                        this.state.series.map(this.renderSeries)
                    }
                </div>
            </section>
        )
    }
}

export default Series