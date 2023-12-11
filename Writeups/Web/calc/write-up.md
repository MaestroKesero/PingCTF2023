Exploit lack of validation of "computed" key in MemberExpression checker

which allows Math.E and Math[E] expressions.

sample solution: https://gist.github.com/egonny/4dbf5151f99059ae58cf9390c7cc3830

credit: <@121673466599440384>

strings also could be created using global x variable which was created by <a id="x'> html code
