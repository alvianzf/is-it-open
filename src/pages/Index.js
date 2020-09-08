import React, { Component } from 'react'
import RestaurantList from '../components/RestaurantList'

export default class Index extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <h1>Is it Open?</h1>
                </div>
                <div className="container">
                    <RestaurantList />
                </div>
                <style>
                    {`
                        .header {
                            padding: 2em;
                            border-bottom: 1px solid #d5d5d5;
                            background: #fff;
                        }
                        .container {
                            padding: 2em;
                            display: flex;
                            justify-content: space-between;
                        }
                    `}
                </style>
            </div>
        )
    }
}
