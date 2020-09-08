import React, { Component } from 'react'
import ListCards from './ListCards'
import {getRestaurants} from "../utils/api"
import classnames from "classnames"

export default class RestaurantList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            restaurants: [],
            offset: 0,
            count: 0,
        }
    }

    componentDidMount () {
        getRestaurants(5,0).then(res=> {
            this.setState({
                restaurants: res.data.data,
                count: res.data.count
            })
        }).catch(err=> console.log(err))
    }

    getRestaurants(offset) {
        getRestaurants(5, offset).then(res=> {
            this.setState({
                restaurants: res.data.data,
                offset
            })
        }).catch(err=> console.log(err))
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
    render() {
        const { restaurants, offset } = this.state

        return (
            <div className="list-of-restaurant">
                <div className="title">
                    <strong>List of Restaurants</strong>
                </div>
                <div className="search">
                    <i className="fa fa-search search-icon"></i>
                    <div style={{width: "90%"}}>
                    <input type="text" placeholder="search here..." />
                    </div>
                </div>

                <div className="lists">
                    {!restaurants.length ? 
                    (<h3>Loading...</h3>)
                    : 
                    restaurants.map((data, i) => 
                        <ListCards name={data.name} time={data.time}/>
                        
                    )}
                </div>
                <div className="buttons">
                        
                <div className={classnames({"btn": offset > 0}, {
                    "disabled": offset == 0
                })} onClick={() => this.handlePrev()}>Prev</div><div className="btn" onClick={() => this.handleNext()}>Next</div>
                </div>
                <style>
                    {`
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
                            justify-content: space-between;
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
