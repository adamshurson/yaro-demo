import React, { Component } from 'react';
import Home from "../home";
import Detail from "../detail";

class MainView extends Component {
    constructor() {
        super();
        this.pages = {
            'home': {
                title: 'Home',
                component: <Home setPage={(page) => this.setPage(page)}/>
            },
            'detail': {
                title: 'Detail',
                component: <Detail setPage={(page) => this.setPage(page)}/>
            },
            'messages': {
                title: 'Messages',
                component: <div>test 2</div>
            }
        };
        this.state = {
            activePage: 'home'
        };
    }
    setPage(page) {
        this.setState({
            activePage: page
        });
    }
    render() {
        return (
            <div className="MainView flex flex-col h-screen w-screen">
                <div className={"flex p-4 justify-center"}>
                    <button onClick={() => this.setPage('home')} className={(this.state.activePage === 'home' ? "bg-teal text-white" : "text-teal") + " border-teal px-4 py-2 rounded border-2 focus:outline-none hover:bg-teal hover:text-white focus:bg-teal focus:text-white"}>Home</button>
                    <button onClick={() => this.setPage('messages')} className={(this.state.activePage === 'messages' ? "bg-teal text-white" : "text-teal") + " ml-auto px-4 py-2 rounded border-2 border-teal focus:outline-none hover:bg-teal hover:text-white focus:bg-teal focus:text-white"}>Messages</button>
                </div>
                <div className={"flex-1 px-4 py-2 overflow-y-auto"}>
                    {this.pages[this.state.activePage].component}
                </div>
            </div>
        );
    }
}
export default MainView;
