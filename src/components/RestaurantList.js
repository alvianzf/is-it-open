import React, { Component } from 'react'
import ListCards from './ListCards'
import {getRestaurants, getRestaurantsByName, getRestaurantsByTime} from "../utils/api"
import { css } from '@emotion/core'
import DotLoader from "react-spinners/DotLoader"
import classnames from "classnames"

export default class RestaurantList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            restaurants: [],
            offset: 0,
            count: 0,
            _isBusy: false,
            _isEmpty: false,
            seconds: 0,
            search: '',
            day: null
        }
    }

    componentDidMount () {
        getRestaurants(12,0).then(res=> {
            this.setState({
                restaurants: res.data.data,
                count: res.data.count
            })
        }).catch(err=> console.log(err))
    }

    getRestaurants(offset = 0) {
        this.setState({_isBusy: true})
        getRestaurants(12, offset).then(res=> {
            const _isEmpty = res.data.data ? false : true
            this.setState({
                restaurants: res.data.data,
                offset,
                _isBusy: false,
                _isEmpty
            })
        }).catch(err=> console.log(err))
    }

    resetList = () => {
        this.setState({search: ''})
        this.getRestaurants()
    }

    handleNext () {
        let { restaurant, offset, count } = this.state
        offset = offset + 5

        this.getRestaurants(offset)

    }

    handlePrev(offset) {

        if (offset != 0) {
            let { restaurant, offset } = this.state
            offset = offset - 5
    
            this.getRestaurants(offset)
        }
    }

    handleSearch = e => {
        const name = e.target.value
        this.setState({search: name})

        if (name != '') {
            getRestaurantsByName(name)
                .then(res =>  {
                    this.setState({restaurants: res.data.data})
                    
                    if (!res.data.data.length) {
                        this.setState({_isBusy: true, _isEmpty: true})
                    } else {
                        this.setState({_isBusy: false, _isEmpty: false})
                    }
                })
        } else {
            this.getRestaurants(0)
        }
    }

    onTimeChange = e => {
        this.setState({ _isBusy: true})
        const time= e.target.value

        const parts = time.match(/(\d+):(\d+)/)
        const hours = Number(parts[1]) * 60 * 60
        const minutes = Number(parts[2]) * 60

        const seconds = hours + minutes

        this.setState({ seconds})
    }

    onDayChange = e => {
        this.setState({ _isBusy: true})
        const day= e.target.value

        day = day.substring(0, 3)

        this.setState({day})

    }

    filterBy = () => {
        const {seconds, day} = this.state
        getRestaurantsByTime(seconds, day).then(res => {
            this.setState({
                restaurants: res.data.data,
                _isBusy: false,
            })
        })
    }

    render() {
        const { restaurants, offset, _isBusy, _isEmpty, search } = this.state

        return (
            <div className="list-of-restaurant">
                <div className="title">
                    <strong>What's open on:</strong>
                </div>
                <div className="search">
                    <i className="fa fa-search search-icon"></i>
                    <div style={{width: "90%"}}>
                    <input type="text" placeholder="search here..." defaultValue={search} value={search} onChange={(e) => this.handleSearch(e) } />
                    </div>
                </div>
                <div className="filters">
                <form>
                    <div>
                        <input type="time" className="filter" required onChange={(e) => this.onTimeChange(e)}/>
                    </div>
                    <div>
                        <select className="filter">
                            <option value="" disabled selected>Select Day</option>
                            <option value="Mon">Monday</option>
                            <option value="Tue">Tuesday</option>
                            <option value="Wed">Wednesday</option>
                            <option value="Thu">Thursday</option>
                            <option value="Fri">Friday</option>
                            <option value="Sat">Saturday</option>
                            <option value="Sun">Sunday</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="filter btn-filter">Filter</button>
                    </div>
                </form>
                        <button className="btn-reset" onClick={() => this.resetList()}>Reset</button>
                </div>
                <div className="lists">
                    {_isEmpty ? 
                    (<h3>No Search results</h3>)
                    : !restaurants.length ?
                    (<DotLoader size={70} color={"#c7ffd6"}/>)
                    : 
                    restaurants.map((data, i) => 
                        <ListCards name={data.name} time={data.time}/>
                        
                    )}
                </div>
                <div className="buttons">
                        
                <div className={classnames({"btn": offset > 0}, {"disabled": _isBusy}, {
                    "disabled": offset == 0
                })} onClick={() => this.handlePrev()}>Prev</div><div className={classnames( {"disabled": _isBusy}, {"btn": !_isBusy})} onClick={() => this.handleNext()}>Next</div>
                </div>
                <style>
                    {`  .filter {
                            padding: 0.5em;
                        }
                        .btn-filter {
                            border: none;
                            padding: 1em 1.5em;
                            cursor: pointer;
                        }
                        .btn-filter:hover {
                            background: #e6e6e6;
                        }
                        .btn-reset {
                            background: yellow;
                            border: none;
                            padding: 1em 1.5em;
                            cursor: pointer;
                        }
                        .btn-reset:hover {
                            background: #e6e6e6;
                        }
                        .filters {
                            display: flex !important;
                            width: 50%;
                            justify-content: flex-start;
                            flex-wrap: wrap;
                            margin-left: 4em;
                        }
                        .filters div {
                            margin-right: 2em;
                        }
                        .buttons {
                            margin-top: 1em;
                            display: flex !important;
                            justify-content: flex-end;
                            align-items: center;
                        }
                        .btn {
                            padding: 1em;
                            border: 1px solid #e6e6e6;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                        .disabled {
                            background: #d6d6d6;
                            color: #999999;
                            padding: 1em;
                            border: 1px solid #e6e6e6;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                        .disabled:hover {
                            background: #999999; !important
                            color: #d6d6d6 !important;
                        }
                        .btn:hover {
                            background: #428eff;
                            color: #fff;
                        }
                        .lists {
                            display: flex !important;
                            margin-top: 2em;
                            justify-content: center;
                            flex-wrap: wrap;
                        }
                        .list-of-restaurant {
                            text-align: left;
                            width: 100%;
                            display: block;
                        }
                        .list-of-restaurant div {
                            display: inline-block;
                        }
                        .title {
                            width: 80%;
                        }
                        .search {
                            display: flex;
                            width: 20%;
                        }
                        .search-icon {
                            padding-right: 0.5em;
                            color: #999999;
                        }
                    `}
                </style>
            </div>
        )
    }
}
