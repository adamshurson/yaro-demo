import React, { Component } from 'react';
import Home from "../home";
import Detail from "../detail";
import Logo from "../logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StoredProcedures from "../storedprocedures";
import Visits from "../visits";
import Messages from "../messages";
import NewMessage from "../newmessage";
import ScrollPearl from '../../pearls/scroll';
import AccountPearl from '../../pearls/account';
import MessageDetail from "../messagedetail";

class MainView extends Component {
    constructor() {
        super();
        this.state = {
            activePage: 'home',
            menuOpen: false,
            canScrollMain: true,
            currentMessage: {
                doctor: {
                    profile: {}
                }
            }
        };
        this.pages = {
            'home': {
                title: 'Home',
                component: <Home setPage={(page) => this.setPage(page)}/>,
                isRoot: true
            },
            'detail': {
                title: 'Appointment Detail',
                component: <Detail />,
                isRoot: false
            },
            'messages': {
                title: 'Messages',
                component: <Messages viewMessage={(message) => this.viewMessage(message)} setPage={(page) => this.setPage(page)}/>,
                isRoot: true
            },
            'new_message': {
                title: 'New Message',
                component: <NewMessage setPage={(page) => this.setPage(page)}/>,
                isRoot: false
            },
            'message_detail': {
                title: 'Message Detail',
                component: <MessageDetail message={this.state.currentMessage} setPage={(page) => this.setPage(page)}/>,
                isRoot: false
            },
            'visits': {
                title: 'Visits',
                component: <Visits />,
                isRoot: true
            },
            'stored_procedures': {
                title: 'Stored Procedures',
                component: <StoredProcedures />,
                isRoot: true
            }
        };
    }
    componentDidMount() {
        this.ScrollPearl = new ScrollPearl();
        this.AccountPearl = new AccountPearl();
        this.ScrollPearl.subscribe((newState) => {
            this.setState({
                canScrollMain: newState.isAllowed
            });
        });
    }
    setPage(page) {
        this.setState({
            activePage: page,
            menuOpen: false
        });
        this.ScrollPearl.setState({
            isAllowed: true
        });
    }
    viewMessage(message) {
        this.setState({
            currentMessage: message
        }, () => {
            this.pages.message_detail.component = <MessageDetail message={this.state.currentMessage} setPage={(page) => this.setPage(page)}/>;
            this.setPage('message_detail');
        });
    }
    toggleMenu() {
        // if menu is going to be open, prevent scroll
        if (!this.state.menuOpen) {
            this.ScrollPearl.setState({
                isAllowed: false
            });
        } else {
            this.ScrollPearl.setState({
                isAllowed: true
            });
        }
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
                        <h2 key={'logout'} onClick={() => this.AccountPearl.logout()} className={"text-right p-2 text-white hover:text-yellow cursor-pointer"}>Logout</h2>
                    </div>
                </div>
                <div className={"overflow-hidden flex-1"}>
                    <div className={(this.state.canScrollMain ? "overflow-y-scroll" : "overflow-y-hidden") + " w-full h-full relative"}>
                        {this.pages[this.state.activePage].component}
                    </div>
                </div>
            </div>
        );
    }
}
export default MainView;
