import React, { Component } from 'react';
import Home from "../home";
import Detail from "../detail";
import Logo from "../logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StoredProcedures from "../storedprocedures";
import Visits from "../visits";

class MainView extends Component {
    constructor() {
        super();
        this.pages = {
            'home': {
                title: 'Home',
                component: <Home setPage={(page) => this.setPage(page)}/>,
                isRoot: true
            },
            'detail': {
                title: 'Appointment Detail',
                component: <Detail setPage={(page) => this.setPage(page)}/>,
                isRoot: false
            },
            'messages': {
                title: 'Messages',
                component: <div>test 2</div>,
                isRoot: true
            },
            'visits': {
                title: 'Visits',
                component: <Visits/>,
                isRoot: true
            },
            'stored_procedures': {
                title: 'Stored Procedures',
                component: <StoredProcedures setPage={(page) => this.setPage(page)}/>,
                isRoot: true
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
            <div className="MainView flex flex-col h-full w-full">
                <div className={"flex p-4 bg-brown items-center z-10"}>
                    <Logo height={"40px"} width={"40px"}/>
                    <h2 className={"flex-1 text-center text-white"}>{this.pages[this.state.activePage].title}</h2>
                    { this.state.menuOpen
                        ? <FontAwesomeIcon onClick={() => this.toggleMenu()} icon={"times"} className={"ml-auto fa-2x text-yellow cursor-pointer"} />
                        : <FontAwesomeIcon onClick={() => this.toggleMenu()} icon={"bars"} className={"ml-auto fa-2x text-yellow cursor-pointer"} />
                    }
                    <div className={(this.state.menuOpen ? "open" : "closed") + " Menu pin-t absolute pin-l pin-r bg-brown flex flex-col pb-4"}>
                        {
                            Object.keys(this.pages).map((name) => {
                                const page = this.pages[name];
                                if (page.isRoot) {
                                    return <h2 key={name} onClick={() => this.setPage(name)}
                                               className={"text-right p-2 text-white hover:text-yellow cursor-pointer"}>{page.title}</h2>
                                }
                            })
                        }
                    </div>
                </div>
                <div className={"overflow-hidden flex-1"}>
                    <div className={(this.state.menuOpen ? "overflow-y-hidden" : "overflow-y-scroll") + " p-4 pb-32 md:pb-4 w-full h-full"}>
                        {this.pages[this.state.activePage].component}
                    </div>
                </div>
            </div>
        );
    }
}
export default MainView;
