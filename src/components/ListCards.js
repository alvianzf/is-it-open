import React, { Component } from 'react'

export default class ListCards extends Component {
    render() {
        const {name, time} = this.props

        const changeToString = (time) => {
           const hours = time / 60 /60
           const minutes = (time - (hours * 60 * 60)) /  60
           const c = hours > 12 ? 12 : 0
           return `${hours.toFixed(0) - c}:${minutes.toFixed(0) == 0 ? "00" : minutes.toFixed(0) } ${c == 12 ? "pm" : "am"}`
        }
        return (
            <div className="card-item">

                <div className="card-title">
                {name}
                </div>


                <div className="card-body">
                <strong>Schedule</strong>
                {time.map((_, i) =>
                    <p>{_.day} | {changeToString(_.start)} - {changeToString(_.end)}</p>
                )}
                </div>
                <style>
                    {`
                        .card-item:hover {
                            background: #e6e6e6;
                        }
                        .card-item {
                            margin: 2em 2em 0 0;
                            width: 200px;
                            padding: 1em;
                            border: 1px solid #999999;
                            border-radius: 10px;
                            min-height: 250px;
                        }
                        .card-title {
                            width: 100%;
                            font-weight: bold;
                            font-size: 1.3em;
                            color: #02633c;
                        }
                        .card-body {
                            margin-top: 1em;
                            width: 100%;
                            font-size: 0.8em;
                        }
                    `}
                </style>
            </div>
        )
    }
}
