import { useEffect, useState } from "react";
import "../css/friendsList.css";
import { connect } from 'react-redux';
import { GetFriends } from '../actions/friendsListActions';

const FriendsList = props => {
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [currentpage, setCurrentPage] = useState(1);
    const [list, setList] = useState([]);
    const [originalList, setOriginalList] = useState();
    const [noOfPages, setNoOfPages] = useState();
    const [favourite, setFavourite] = useState(false);
    const [totalEntities, setTotalEntities] = useState();
    const [hightlighted, setHighlighted] = useState("");
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [deleteId, setDeleteId] = useState()

    useEffect(() => {
        let friendList = [
            {
                name: "Rahul Gupta",
                favourite: true
            },
            {
                name: "Shivangi Sharma",
                favourite: false
            },
            {
                name: "Akash Singh",
                favourite: false
            },
            {
                name: "Kumar madhu",
                favourite: false
            },
            {
                name: "Karthik N",
                favourite: true
            },
            {
                name: "Anand C haveri",
                favourite: true
            },
            {
                name: "Smriti Mandana",
                favourite: false
            },
            {
                name: "Rahul Dravid",
                favourite: false
            },
            {
                name: "Virat Kohli",
                favourite: false
            },
            {
                name: "Sehwag",
                favourite: true
            },
            {
                name: "Mithali Raj",
                favourite: true
            },
        ]
        let newList = friendList.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
            if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        })
        if (newList.length) {
            props.GetFriends(newList)
            let pages = newList.length % 4;
            if (pages > 0) {
                setNoOfPages(Math.trunc(newList.length / 4) + 1)
            }
            else {
                setNoOfPages(Math.trunc(newList.length / 4))
            }
            setOriginalList([...newList])
            setTotalEntities(newList.length)
            let array = [...newList]
            let sortedList = array.splice(0, 4);
            setList(sortedList)
        }
    }, [])

    const onPrev = () => {
        if (currentpage > 1) {
            let newList = [...originalList]
            let curPage = currentpage - 1;
            let sortedList = newList.splice((curPage * 4) - 4, 4);
            setList(sortedList)
            setCurrentPage(curPage)
        }
        setHighlighted("")
        setName("")
    }

    const onNext = () => {
        if (currentpage < noOfPages) {
            let newList = [...originalList]
            let curPage = currentpage + 1;
            let sortedList = newList.splice((curPage * 4) - 4, 4);
            setList(sortedList)
            setCurrentPage(curPage)
        }
        setHighlighted("")
        setName("")
    }

    const onFavourite = () => {
        if (favourite == false) {
            setFavourite(true);
            let newList = [...props.friendsList]
            let favourites = newList.filter(res => res.favourite == true)
            let pages = favourites.length % 4;
            if (pages > 0) {
                setNoOfPages(Math.trunc(favourites.length / 4) + 1)
            }
            else {
                setNoOfPages(Math.trunc(favourites.length / 4))
            }
            setOriginalList([...favourites])
            setTotalEntities(favourites.length)
            let array = [...favourites]
            let sortedList = array.splice(0, 4);
            setList(sortedList);
            setCurrentPage(1)
            setHighlighted("")
            setName("")
            setSearch("")
        }
        else {
            setFavourite(false);
            let favourites = [...props.friendsList]
            let pages = favourites.length % 4;
            if (pages > 0) {
                setNoOfPages(Math.trunc(favourites.length / 4) + 1)
            }
            else {
                setNoOfPages(Math.trunc(favourites.length / 4))
            }
            setOriginalList([...favourites])
            setTotalEntities(favourites.length)
            let array = [...favourites]
            let sortedList = array.splice(0, 4);
            setList(sortedList);
            setCurrentPage(1)
            setHighlighted("")
            setName("")
            setSearch("")
        }
    }

    const onNameChange = (e) => {
        setName(e.target.value)
        setHighlighted("")
    }

    const onSearchChange = (e) => {
        setSearch(e.target.value)
        setName("")
        setHighlighted("")
        let list = [...originalList]
        let newArray = list.filter(res => res.name.toLowerCase().includes(e.target.value.toLowerCase().replace(/\s+/g, ' ').trim()))
        let pages = newArray.length % 4;
        if (pages > 0) {
            setNoOfPages(Math.trunc(newArray.length / 4) + 1)
        }
        else {
            setNoOfPages(Math.trunc(newArray.length / 4))
        }
        let array = [...newArray]
        setTotalEntities(newArray.length)
        let sortedList = array.splice(0, 4);
        setList(sortedList);
        setCurrentPage(1)
    }

    const checkActive = (friend) => {
        return friend.name.toLowerCase() == name.toLowerCase().replace(/\s+/g, ' ').trim()
    }

    const handleKeypress = e => {
        if (e.charCode === 13) {
            if (name != "") {
                let list = [...props.friendsList];
                if (list.some(res => res.name.toLowerCase() == name.toLowerCase().replace(/\s+/g, ' ').trim())) {
                    let index = list.findIndex(checkActive);
                    setFavourite(false)
                    setHighlighted(name.toLowerCase().replace(/\s+/g, ' ').trim())
                    let pages = index % 4;
                    if (index == 0) {
                        setCurrentPage(1)
                        let sorArray = [...list]
                        let sortedList = sorArray.splice(index, 4);
                        setList(sortedList)
                    }
                    else if (pages > 0) {
                        setCurrentPage(Math.trunc((index / 4) + 1))
                        let sortedList = list.splice(((Math.trunc(index / 4) + 1) * 4) - 4, 4);
                        setList(sortedList)
                    }
                    else {
                        setCurrentPage(Math.trunc(index / 4))
                        let sortedList = list.splice(((Math.trunc(index / 4) + 1) * 4) - 4, 4);
                        setList(sortedList)
                    }
                    setName("")
                    setSearch("")
                    setMessage("This name is already in your Friends List.")
                    setStatus(1)
                    setTimeout(() => {
                        setMessage("")
                        setStatus(0)
                    }, 2000)
                }
                else {
                    let list5 = [...props.friendsList];
                    setFavourite(false)
                    setHighlighted(name.toLowerCase().replace(/\s+/g, ' ').trim())
                    list5.push({
                        name: name.toLowerCase().replace(/\s+/g, ' ').trim(),
                        favourite: false
                    })
                    let newList = list5.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                    })
                    if (newList.length) {
                        props.GetFriends(newList)
                        setOriginalList([...newList])
                        let pages1 = newList.length % 4;
                        if (pages1 > 0) {
                            setNoOfPages(Math.trunc(newList.length / 4) + 1)
                        }
                        else {
                            setNoOfPages(Math.trunc(newList.length / 4))
                        }
                        setTotalEntities(newList.length)
                        let array = [...newList]
                        let index = array.findIndex(checkActive);
                        let pages = index % 4;
                        if (index == 0) {
                            setCurrentPage(1)
                            let sorArray = [...newList]
                            let sortedList = sorArray.splice(index, 4);
                            setList(sortedList)
                        }
                        else if (pages > 0) {
                            let sorArray = [...newList]
                            setCurrentPage(Math.trunc(index / 4) + 1)
                            let sortedList = sorArray.splice(Math.trunc(index / 4) * 4, 4);
                            setList(sortedList)
                        }
                        else {
                            setCurrentPage(Math.trunc(index / 4) + 1)
                            let sorArray = [...newList]
                            let sortedList = sorArray.splice(index, 4);
                            setList(sortedList)
                        }
                    }
                    setName("")
                    setSearch("")
                    setMessage("New contact added to your friends List.")
                    setStatus(2)
                    setTimeout(() => {
                        setMessage("")
                        setStatus(0)
                    }, 2000)
                }
            }
        }
    };

    const onAdd = () => {
        if (name != "") {
            let list = [...props.friendsList];
            if (list.some(res => res.name.toLowerCase() == name.toLowerCase().replace(/\s+/g, ' ').trim())) {
                let index = list.findIndex(checkActive);
                setFavourite(false)
                setHighlighted(name.toLowerCase().replace(/\s+/g, ' ').trim())
                let pages = index % 4;
                if (index == 0) {
                    setCurrentPage(1)
                    let sorArray = [...list]
                    let sortedList = sorArray.splice(index, 4);
                    setList(sortedList)
                }
                else if (pages > 0) {
                    setCurrentPage(Math.trunc((index / 4) + 1))
                    let sortedList = list.splice(((Math.trunc(index / 4) + 1) * 4) - 4, 4);
                    setList(sortedList)
                }
                else {
                    setCurrentPage(Math.trunc(index / 4))
                    let sortedList = list.splice(((Math.trunc(index / 4) + 1) * 4) - 4, 4);
                    setList(sortedList)
                }
                setName("")
                setSearch("")
                setMessage("This name is already in your Friends List.")
                setStatus(1)
                setTimeout(() => {
                    setMessage("")
                    setStatus(0)
                }, 2000)
            }
            else {
                let list5 = [...props.friendsList];
                setFavourite(false)
                list5.push({
                    name: name.toLowerCase().replace(/\s+/g, ' ').trim(),
                    favourite: false
                })
                setHighlighted(name.toLowerCase().replace(/\s+/g, ' ').trim())
                let newList = list5.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                })
                if (newList.length) {
                    props.GetFriends(newList)
                    setOriginalList([...newList])
                    let pages1 = newList.length % 4;
                        if (pages1 > 0) {
                            setNoOfPages(Math.trunc(newList.length / 4) + 1)
                        }
                        else {
                            setNoOfPages(Math.trunc(newList.length / 4))
                        }
                    setTotalEntities(newList.length)
                    let array = [...newList]
                    let index = array.findIndex(checkActive);
                    let pages = index % 4;
                    if (index == 0) {
                        setCurrentPage(1)
                        let sorArray = [...newList]
                        let sortedList = sorArray.splice(index, 4);
                        setList(sortedList)
                    }
                    else if (pages > 0) {
                        let sorArray = [...newList]
                        setCurrentPage(Math.trunc(index / 4) + 1)
                        let sortedList = sorArray.splice(Math.trunc(index / 4) * 4, 4);
                        setList(sortedList)
                    }
                    else {
                        setCurrentPage(Math.trunc(index / 4) + 1)
                        let sorArray = [...newList]
                        let sortedList = sorArray.splice(index, 4);
                        setList(sortedList)
                    }
                }
                setName("")
                setSearch("")
                setMessage("New contact added to your friends List.")
                setStatus(2)
                setTimeout(() => {
                    setMessage("")
                    setStatus(0)
                }, 2000)
            }
        }
    }

    const onFav = (n) => {
        let list1 = [...list];
        let originalList1 = [...originalList];
        let friendsList1 = [...props.friendsList];
        for (let i = 0; i < list1.length; i++) {
            if (list1[i].name.toLowerCase() == n.toLowerCase()) {
                list1[i].favourite = !list1[i].favourite
                if (list1[i].favourite == true) {
                    setMessage("Successfully added from your favourites.")
                    setStatus(2)
                    setTimeout(() => {
                        setMessage("")
                        setStatus(0)
                    }, 2000)
                }
                else {
                    setMessage("Successfully removed from your favourites.")
                    setStatus(1)
                    setTimeout(() => {
                        setMessage("")
                        setStatus(0)
                    }, 2000)
                }
            }
        }
        for (let j = 0; j < originalList1.length; j++) {
            if (originalList1[j].name.toLowerCase() == n.toLowerCase()) {
                originalList1[j].favourite = !originalList1[j].favourite
            }
        }
        for (let k = 0; k < friendsList1.length; k++) {
            if (friendsList1[k].name.toLowerCase() == n.toLowerCase()) {
                friendsList1[k].favourite = !friendsList1[k].favourite
            }
        }
        setHighlighted("")
        setName("")
        setList(list1)
        setOriginalList(originalList1)
        props.GetFriends(friendsList1)
    }

    const onDelete = (n) => {
        setDeleteId(n.toLowerCase())
        setDeleteStatus(true)
        setHighlighted("")
        setName("")
    }

    const onPageBtn = (n) => {
        let newList = [...originalList]
        setCurrentPage(n)
        let currentList = newList.splice((n * 4) - 4, 4)
        setList(currentList)
    }

    const onNo = () => {
        setDeleteId("")
        setDeleteStatus(false)
    }

    const onDeleteSuccess = () => {
        let n = deleteId;
        let originalList1 = [...originalList];
        let friendsList1 = [...props.friendsList];
        let originalList2 = originalList1.filter(li2 => li2.name.toLowerCase() != n.toLowerCase())
        let friendsList2 = friendsList1.filter(li3 => li3.name.toLowerCase() != n.toLowerCase())
        let newList = [...originalList2]
        setOriginalList(originalList2)
        props.GetFriends(friendsList2)
        setTotalEntities(originalList2.length)
        let pages = originalList2.length % 4;
        if (pages > 0) {
            setNoOfPages(Math.trunc(originalList2.length / 4) + 1)
        }
        else {
            setNoOfPages(Math.trunc(originalList2.length / 4))
        }
        if (originalList2.length <= (currentpage * 4) - 4) {
            let newpage = currentpage - 1
            setCurrentPage(newpage)
            let sortedList = newList.splice((newpage * 4) - 4, 4);
            setList(sortedList)
        }
        else {
            let newpage = currentpage;
            setCurrentPage(newpage)
            let sortedList = newList.splice((newpage * 4) - 4, 4);
            setList(sortedList)
        }
        setMessage("Successfully deleted from your friends List.")
        setStatus(2)
        setTimeout(() => {
            setMessage("")
            setStatus(0)
        }, 2000)
        setDeleteStatus(false)
    }

    return (
        <div className="container">
            {status != 0 &&
                <div className={status == 1 ? "danger alert_message" : "success alert_message"}>
                    {status == 2 ? <i className="fa fa-check-circle" /> :
                        <i className="fa fa-warning" />}
                    <div>{message}</div>
                </div>}
            {deleteStatus == true && <div id="myModal" className="modal">
                <div className="modal-content">
                    <i className="fa fa-warning" />
                    <div className="head">Are you sure?</div>
                    <div className="sub_txt">You want to delete <span>{deleteId}</span> from your friend list.</div>
                    <div className="btn_grp">
                        <button className="remove_btn" onClick={() => onNo()}>No</button>
                        <button className="ok_btn" onClick={() => onDeleteSuccess()}>Delete</button>
                    </div>
                </div>
            </div>}
            <div className="list_main_container">
                <div className="list_heading">
                    <div className="header">Friends List</div>
                    <div className="icons_container">
                        <div onClick={() => onFavourite()} className={favourite == false ? "star_icon" : "active star_icon"}>
                            <div className={favourite == false ? "inside_star_icon" : "active inside_star_icon"}></div>
                        </div>
                        <span className="tooltiptext">favourites</span>
                    </div>
                </div>
                <div className="search_container">
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search" value={search || ''} onChange={onSearchChange} />
                </div>
                <div className="add_friend_container">
                    <input type="text" placeholder="Enter your friend name" value={name || ''} onChange={onNameChange} onKeyPress={handleKeypress} />
                    <button className="add_btn" onClick={() => onAdd()} disabled={name == "" ? true : false}>Add</button>
                </div>
                {list != undefined ? list.length ?
                    <div className="list_container">
                        {list.map((res, i) =>
                            <div className={hightlighted.toLowerCase() != res.name.toLowerCase() ? "friend_container" : "newAdded friend_container"} key={i}>
                                <div className="name_container">
                                    <div className="name">{res.name.toLowerCase()}</div>
                                    <div className="tag_line">is you friend</div>
                                </div>
                                <div className="action_icons_container">
                                    <div className="fav_icon_container" onClick={() => onFav(res.name)}>
                                        <div className={res.favourite == false ? "star_icon" : "active star_icon"}>
                                            <div className={res.favourite == false ? "inside_star_icon" : "active inside_star_icon"}></div>
                                        </div>
                                    </div>
                                    <div className="delete_icon_container" onClick={() => onDelete(res.name)}>
                                        <i className="fa fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> :
                    <div className="no_friend">No data to dispaly.</div>:null
                }
            </div>
            {originalList != undefined && originalList.length >3 &&
                <div className="pagination_container">
                    <div className="pagination_txt">
                        Showing {currentpage * 4 - 3} to {currentpage * 4 > totalEntities ? totalEntities : currentpage * 4} of {totalEntities} entries
                    </div>
                    <div className="pagination_btns">
                        <div className={currentpage == 1 ? "deactive pagination_btn" : "pagination_btn"} onClick={() => onPrev()}>{"< Prev"}</div>
                        {currentpage == 1 ?
                            <div className="pagination_numbers">
                                <div className="active page_number" onClick={() => onPageBtn(1)}>1</div>
                                {noOfPages > 1 && <div className="page_number" onClick={() => onPageBtn(2)}>2</div>}
                                {noOfPages > 2 && <div className="page_number" onClick={() => onPageBtn(3)}>3</div>}
                            </div> :
                            currentpage == noOfPages ?
                                <div className="pagination_numbers">
                                    {(noOfPages - 2) > 0 && <div className="page_number" onClick={() => onPageBtn(noOfPages - 2)}>{noOfPages - 2}</div>}
                                    {(noOfPages - 1) > 0 && <div className="page_number" onClick={() => onPageBtn(noOfPages - 1)}>{noOfPages - 1}</div>}
                                    <div className="active page_number" onClick={() => onPageBtn(noOfPages)}>{noOfPages}</div>
                                </div> :
                                <div className="pagination_numbers">
                                    <div className="page_number" onClick={() => onPageBtn(currentpage - 1)}>{currentpage - 1}</div>
                                    <div className="active page_number" onClick={() => onPageBtn(currentpage)}>{currentpage}</div>
                                    <div className="page_number" onClick={() => onPageBtn(currentpage + 1)}>{currentpage + 1}</div>
                                </div>}
                        <div className={noOfPages == currentpage ? "deactive pagination_btn" : "pagination_btn"} onClick={() => onNext()}>{"Next >"}</div>
                    </div>
                </div>}
        </div>
    )
}

const mapStateToProps = state => ({
    friendsList: state.friendsList
})

const mapDispatchToProps = dispatch => ({
    GetFriends: (data) => dispatch(GetFriends(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
