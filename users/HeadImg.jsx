import { React, useRef, createRef, useState, useEffect } from "react";
import BuyBotton from "./BuyBotton";
import {
    BuyerSettings,
    MyOrder,
    PurchaseHistory,
    FavoriteArtist,
    FavoriteArts,
    // getMemberId
} from "./userOnclick";
import axios from "axios";
import buyerImg from "./image/buyHead.png";

function HeadImg(user) {
    let [UserData, setUserData] = useState(); //記錄數值
    let [UserOldData, setUserOldData] = useState(); //原本的數據
    // 只執行一次
    useEffect(() => {
        async function getMember2() {
            let response = await axios.get(
                "http://localhost:3001/api/members",
                {
                    withCredentials: true,
                }
            );
            let response2 = await axios.get(
                `http://localhost:3001/users/${response.data.users_id}`,
                {
                    withCredentials: true,
                }
            );
            // UserInputData.current = response2.data[0];
            setUserData(response2.data[0].users_id);
            setUserOldData(response2.data[0]);
        }
        getMember2();
    }, []);
    //  記錄輸入的數值
    const [UserInputData, setUserInputData] = useState({
        username: "",
        account: "",
        email: "",
        phone: "",
    });
    useEffect(() => {
        console.log(UserInputData);
    }, [UserInputData]);
    // 每次輸入後更新
    const handleChange = (event) => {
        setUserInputData({
            ...UserInputData,
            [event.target.name]: event.target.value,
        });
    };
    // 送出輸入資料
    const handleSubmit = (event) => {

        event.preventDefault();
        axios
            .put(`http://localhost:3001/users/${UserData}`, {
                username: UserInputData.username,
                account: UserInputData.account,
                email: UserInputData.email,
                phone: UserInputData.phone,
                usersId: UserData,
            })
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
    };
    // console.log(UserOldData);
    return (
        <div className='_buyLogin_flex'>
            <div className='_buyLogin_RWDflexcol _buyLogin_rwd_flex'>
                <div className='_buyLogin_flex-re' style={{ marginTop: "1em" }}>
                    <img
                        src={buyerImg}
                        alt='buyHead'
                        className='_buyLogin_headImg'
                    />
                    <label className='_buyLogin_headIcon'>
                        {/* 增加檔案 */}
                        <input type='file' style={{ display: "none" }}></input>
                    </label>
                </div>
                <h3>
                    您好
                    {/* <span>{UserData.users_name}</span> */}
                    <span>你現在是</span>
                    <span>藝拍小夥伴啦</span>
                </h3>
            </div>

            <div className=' _buyLogin_rwd_flexbtn'>
                {/* 按鈕列 */}
                <BuyBotton
                    text='帳戶設定'
                    className='_buyLogin_buyerControlBtn _buyLogin_Icon _buyLogin_SettingIcon'
                    onClick={BuyerSettings}
                />
                <BuyBotton
                    text='購買記錄'
                    className='_buyLogin_buyerControlBtn _buyLogin_Icon _buyLogin_historyIcon'
                    onClick={PurchaseHistory}
                />
                <BuyBotton
                    text='我的訂單'
                    className='_buyLogin_buyerControlBtn _buyLogin_Icon _buyLogin_orderIcon'
                    onClick={MyOrder}
                />
                <BuyBotton
                    text='我喜愛的藝術家'
                    className='_buyLogin_buyerControlBtn _buyLogin_Icon _buyLogin_loveartistIcon'
                    onClick={FavoriteArtist}
                />
                <BuyBotton
                    text='我喜愛的藝術品'
                    className='_buyLogin_buyerControlBtn _buyLogin_Icon _buyLogin_loveartIcon'
                    onClick={FavoriteArts}
                />
            </div>
            <div id='BuyerSettings' style={{ display: "none" }}>
                <div className='_buyLogin_flex_content_sa '>
                    <div className='_buyLogin_mx2'>
                        <div className='_buyLogin_Titlebox _buyLogin_flex'>
                            <div
                                className='_buyLogin_h4'
                                style={{ marginLeft: "0" }}
                            >
                                帳戶設定
                            </div>
                        </div>
                        {/* 左邊表單 */}

                        <div
                            className='_buyLogin_Contentbox _buyLogin_flex'
                            style={{
                                alignItems: "unset",
                                justifyContent: "space-between",
                            }}
                        >
                            <form
                                method='post'
                                name='leftForm'
                                onSubmit={handleSubmit}
                            >
                                <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                    <label className='_buyLogin_h4'>
                                        用戶姓名：
                                    </label>
                                    <input
                                        className='_buyLogin_SettingInput'
                                        type='text'
                                        name='username'
                                        // placeholder={UserOldData.users_name}
                                        value={UserInputData.username}
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>
                                <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                    <label className='_buyLogin_h4'>
                                        帳號：
                                    </label>
                                    <input
                                        className='_buyLogin_SettingInput'
                                        type='text'
                                        name='account'
                                        value={UserInputData.account}
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>
                                <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                    <label className='_buyLogin_h4'>
                                        Email：
                                    </label>
                                    <input
                                        className='_buyLogin_SettingInput'
                                        type='email'
                                        name='email'
                                        value={UserInputData.email}
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>
                                <div className=' _buyLogin_flex_content _buyLogin_p2'>
                                    <label className='_buyLogin_h4'>
                                        Tel：
                                    </label>
                                    <input
                                        className='_buyLogin_SettingInput'
                                        type='tel'
                                        name='phone'
                                        value={UserInputData.phone}
                                        onChange={handleChange}
                                        required
                                    ></input>
                                </div>
                                <div className=' _buyLogin_p2 _buyLogin_flex_end'>
                                    <button
                                        className='_buyLogin_ChangeControlBtn'
                                    >
                                        更改
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* 右邊表單 */}
                    <div className='_buyLogin_mx2'>
                        <div className='_buyLogin_Titlebox _buyLogin_flex'>
                            <div
                                className='_buyLogin_h4'
                                style={{ marginLeft: "0" }}
                            >
                                地址設定
                            </div>
                        </div>
                        <div className='_buyLogin_Contentbox'>
                            {/* 右邊表單 */}
                            <form method='post'>
                                <div className=' _buyLogin_flex_content _buyLogin_p1'>
                                    <label className='_buyLogin_h4'>
                                        城市：
                                    </label>
                                    <select className='_buyLogin_SettingInput'>
                                        <option disabled>請選擇城市</option>
                                        <option>桃園市</option>
                                        <option>新北市</option>
                                        <option>台北市</option>
                                        <option>基隆市</option>
                                        <option>宜蘭縣</option>
                                        <option>花蓮縣</option>
                                        <option>台東縣</option>
                                        <option>屏東縣</option>
                                        <option>高雄市</option>
                                        <option>台南市</option>
                                        <option>嘉義縣</option>
                                        <option>嘉義市</option>
                                        <option>雲林縣</option>
                                        <option>南投縣</option>
                                        <option>彰化縣</option>
                                        <option>台中市</option>
                                        <option>苗栗縣</option>
                                        <option>新竹縣</option>
                                        <option>新竹市</option>
                                        <option>澎湖縣</option>
                                        <option>金門縣</option>
                                        <option>連江縣</option>
                                    </select>
                                </div>
                                <div className=' _buyLogin_flex_content _buyLogin_p1'>
                                    <label className='_buyLogin_h4'>
                                        鄉鎮市區：
                                    </label>
                                    <input
                                        className='_buyLogin_SettingInput'
                                        type='text'
                                        name='township'
                                    ></input>
                                </div>
                                <div className=' _buyLogin_flex_content _buyLogin_p1'>
                                    <label className='_buyLogin_h4'>
                                        鄰里：
                                    </label>
                                    <input
                                        className='_buyLogin_SettingInput'
                                        type='text'
                                        name='adjacent'
                                    ></input>
                                </div>
                                <div className=' _buyLogin_flex_content _buyLogin_p1'>
                                    <label className='_buyLogin_h4'>
                                        道路或街名：
                                    </label>
                                    <input
                                        className='_buyLogin_SettingInput'
                                        type='text'
                                        name='rode'
                                    ></input>
                                </div>

                                <div className=' _buyLogin_flex_content _buyLogin_p1'>
                                    <label className='_buyLogin_h4'>
                                        郵遞區號：
                                    </label>
                                    <input
                                        className='_buyLogin_SettingInput'
                                        type='number'
                                        name='postalCode'
                                    ></input>
                                </div>
                                <div
                                    className='_buyLogin_flex _buyLogin_p1 _buyLogin_flex_end'
                                    style={{ alignItems: "flex-end" }}
                                >
                                    <button className='_buyLogin_ChangeControlBtn'>
                                        更改
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id='PurchaseHistory' style={{ display: "none" }}>
                <div style={{ overflowX: "auto" }}>
                    <table className='_buyLogin_table'>
                        <thead className='_buyLogin_tline'>
                            <tr className='_buyLogin_td'>
                                <th>訂單編號</th>
                                <th>金額</th>
                                <th>訂購時間</th>
                                <th>訂購品項</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                className='_buyLogin_tr _buyLogin_tline'
                                style={{ borderColor: "#CAB296" }}
                            >
                                <td>1002939311112</td>
                                <td>12,800</td>
                                <td>2022/11/02</td>
                                <td>1</td>
                                <td>
                                    <button className='_buyLogin_tableBtn'>
                                        詳細資訊
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='userBtns'></div>
        </div>
    );
}

export { HeadImg };
