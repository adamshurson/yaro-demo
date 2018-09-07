import React, { Component } from 'react';
import Home from "../home";
import Detail from "../detail";
import Logo from "../logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MainView extends Component {
    constructor() {
        super();
        this.pages = {
            'home': {
                title: 'Home',
                component: <Home setPage={(page) => this.setPage(page)}/>
            },
            'detail': {
                title: 'Appointment Detail',
                component: <Detail setPage={(page) => this.setPage(page)}/>
            },
            'messages': {
                title: 'Messages',
                component: <div>test 2</div>
            }
        };
        this.state = {
            activePage: 'home',
            menuOpen: false
        };
    }
    setPage(page) {
        this.setState({
            activePage: page,
            menuOpen: false
        });
    }
    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }
    render() {
        return (
            <div className="MainView flex flex-col h-screen w-screen">
                <div className={"flex p-4 bg-brown items-center"}>
                    <Logo height={"40px"} width={"40px"}/>
                    <h2 className={"flex-1 text-center text-white"}>{this.pages[this.state.activePage].title}</h2>
                    { this.state.menuOpen
                        ? <FontAwesomeIcon onClick={() => this.toggleMenu()} icon={"times"} className={"ml-auto fa-2x text-yellow cursor-pointer"} />
                        : <FontAwesomeIcon onClick={() => this.toggleMenu()} icon={"bars"} className={"ml-auto fa-2x text-yellow cursor-pointer"} />
                    }
                </div>
                <div className={(this.state.menuOpen ? "overflow-y-hidden" : "overflow-y-auto") + " flex-1 p-4 relative"}>
                    <div className={(this.state.menuOpen ? "open" : "closed") + " Menu absolute pin-t pin-l pin-r bg-brown flex flex-col z-10 pb-4"}>
                        <h2 onClick={() => this.setPage('home')} className={"text-right p-2 text-white hover:text-yellow cursor-pointer"}>Home</h2>
                        <h2 onClick={() => this.setPage('messages')} className={"text-right p-2 text-white hover:text-yellow cursor-pointer"}>Messages</h2>
                    </div>
                    {this.pages[this.state.activePage].component}
                </div>
            </div>
        );
    }
}
export default MainView;
