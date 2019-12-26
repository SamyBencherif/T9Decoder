
const readline = require('readline');
const en_dictionary = require("./google-10000-english-usa.js").en_dictionary

function decode_t9(msg)
{
	// Input message in T9 format
	const data = {
	  message: msg,
	  undeciphered: '',
	  deciphered: '',
	  fullMatches: []
	}

	data.undeciphered = data.message;

	// Mapping of 10 digit keypad buttons to letters
	const keys = {
	  0: ' ',
	  1: '[.,?!]',
	  2: '[abcABC]',
	  3: '[defDEF]',
	  4: '[ghiGHI]',
	  5: '[jklJKL]',
	  6: '[mnoMNO]',
	  7: '[pqrsPQRS]',
	  8: '[tuvTUV]',
	  9: '[wxyzWXYZ]'
	}

	while (data.undeciphered)
	{
	  // Consume word of input
	  var wordRE = ''
	  var wordREsize = 0
	  for (var c of data.undeciphered)
	  {
		c = parseInt(c)

		if (c == 0 || c == 1 || '' + c == 'NaN')
		{
		  break
		}

		wordRE += keys[c]
		wordREsize += 1
	  }

	  // collect words from dictionary
	  var word = ''
	  var found = false

	  for (var c of en_dictionary)
	  {
		if (c == '\n')
		{
		  // if it is a match
		  if (word.match('^' + wordRE + '$') != null)
		  {
			// choose the first matching word
			found = true
			break
		  }
		  else
		  {
			word = ''
			continue
		  }
		}
		word += c
	  }

	  if (found)
	  {
		data.undeciphered = data.undeciphered.slice(word.length)
		data.deciphered += word
	  }
	  else {
		data.undeciphered = data.undeciphered.slice(wordREsize)
		data.deciphered += "(???)"
	  }

	  while (data.undeciphered && 
			(data.undeciphered[0] == '0' || data.undeciphered[0] == '1'
			 || '' + parseInt(data.undeciphered[0]) == 'NaN'))
	  {
		data.deciphered += " 0".includes(data.undeciphered[0])  ? ' ' : '_'
		data.undeciphered = data.undeciphered.slice(1)
	  }
	}

	return data.deciphered
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Ex message: '43556 96753'")
rl.question('T9 Message: ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Decoded Message: ${decode_t9(answer)}`);

  rl.close();
});

