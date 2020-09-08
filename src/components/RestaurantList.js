import React, { Component } from 'react'

export default class RestaurantList extends Component {
    render() {
        return (
            <div className="list-of-restaurant">
                <div className="title">
                    <strong>List of Restaurants</strong>
                </div>
                <div className="search">
                    <i className="fa fa-search search-icon"></i>
                    <div>
                    <input type="text" placeholder="search here..." />
                    </div>
                </div>
                <style>
                    {`
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
