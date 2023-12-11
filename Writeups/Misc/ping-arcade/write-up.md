# Write-up: ping-arcade

## Category: misc

## Author mobaradev

Use for example Il2CppDumper (https://github.com/Perfare/Il2CppDumper) to decompile the game.

Then, there are many possibilities to cheat the game.

## 1st way (Reverse engineering):

You can see NetworkManager class that handles sending results to the server:

```
public IEnumerator FinishGame(List<float> times, string controlNumber, Action<FinishGameResponse> callback)
```

It is called from GameController.cs, and takes 2 parameters: times and controlNumber.
By digging in the GameController class, you can find how the controlNumber is made:

```
string controlNumber = ((this.URandomC.GetNumber(0, this.URandomC.GetNumber(0, 10000)) * GameObject.FindWithTag("X").transform.position.y).ToString());
```

The position of gameobject with tag "X" is updated from the InputManager.cs everytime player clicks Space - which is equal to the number of levels:

```
public class InputManager : MonoBehaviour
{
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            GameObject.FindWithTag("X").transform.position += Vector3.up * 1.25f;
        }
    }
}
```

For 64 levels, the y position should be 0 + 64 \* 1.25f = 80.

Then, we have to find URandomC's values.

When game starts, the accessCode is get from the server, and it's used as an input parameter to the URandom functions:

```
...

        StartCoroutine(NetworkManager.StartGame((res) =>
        {
            if (res.success)
            {
                this.offlineMode = false;

                this.URandom = new UnifiedRandom(res.accessCode);
                this.URandomB = new UnifiedRandom(res.accessCode);
                this.URandomC = new UnifiedRandom(res.accessCode);
            }
...
```

URandomC is used also to generate levels:

```
 void GenerateLevels(int numberOfLevels)
{
	for (int i = 0; i < numberOfLevels; i++)
	{
		int index = URandomC.GetNumber(0, 5);
		this.CorrectStartIndexes.Add(index);
		Level lvl = Instantiate(this.LevelPrefab, new Vector3(0, i * 1.2f), Quaternion.identity)
			.GetComponent<Level>();
		lvl.Generate(index);
		this._levels.Add(lvl);
	}
}

```

Then, it's used only once at the end - to calculate the controlNumber.

You can call URandomC.GetNumber(0, 5) 64 times, and then

```
((this.URandomC.GetNumber(0, this.URandomC.GetNumber(0, 10000))
```

and with that you can obtain the control number (assuming you used the same input for URandomC's constructor)

Using URandom and URandomB, you can write your own function that will return the acceptable time range for each level.

Example:

```
// Level.cs
public int GetFirstCorrectCellIndex()
{
	int i = 0;
	foreach (Cell cell in this.Cells)
	{
		if (cell.IsCorrect) return i;
		i++;
	}

	return -1;
}

// GameController.cs

/* add and initialize
public UnifiedRandom URandom2;
public UnifiedRandom URandomB2;
the same way as URandom and URandomB.
*/

float[] CalculateTimes(int levelIndex)
{
	float repeatRate = URandomB2.GetNumber(8, 25)/100f;

	int correctIndexStart = this._levels[levelIndex].GetFirstCorrectCellIndex();
	int correctIndexEnd = correctIndexStart + 2;

	float delay = this.URandom2.GetNumber(0, 25) / 100f;

	float correctTimeStart = (correctIndexStart * repeatRate) - delay;
	float correctTimeEnd = (correctIndexEnd * repeatRate) - delay;

	return new float[]{correctTimeStart, correctTimeEnd};
}
```

Then, use the times within (correctTimeStart, correctTimeEnd) as a parameter of this.NetworkManager.FinishGame(this.Times, controlNumber, callback) function.

You can also manually send the request.

### 2nd way

Use for example Il2CppDumper (https://github.com/Perfare/Il2CppDumper) to decompile the game.

Change the code in proper places to make the client automatically play the game for you and click always when it's the right time to do so.
For example in Level.cs or GameController.cs, check every time if the current position of hovered cells is equal to position of correct cells.
If so, then call the code that handles space click.



Aclarations of Tomek: (server.zip) Polemica

This is the server after the following announcement - https://discord.com/channels/915586455798173756/915586957659209729/1183148081492013138

It occured during the CTF that the client game of people who had polish versions of windows was sending `1,1` instead of `1.1` so there's a hot-fix regarding that



I cracked the game in three or four ways. In the last iteration it was slower and always randomizes cells from first position so you can pass 64 levels just by mashing space.


Rai tried everything from moving the goal to slowing it down to auto play to negating delay and nothing gave the flag


Yea i did the same thing as the provided cheat above, with using the canwin func and using a if value it was already doing auto to prevent it running the level up func too many times

Any1 use cheatengine or live debugging?To manipulate memery live?


Yeah


Could you tell me how? I cannot find anything in cheatengine


Manipulating the level vals in memory messes with the times that get sent off anyway



You first look for a value that’s zero on initial scan, beat level 1, then scan for 1, beat level 2 then scan for 2 and it should narrow it down to 3 values after 2 or 3 levels
You can change those values and it’ll move everything but the camera to the level you specify

