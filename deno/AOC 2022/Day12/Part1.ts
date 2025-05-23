let raw = await Deno.readTextFile("example.txt");
console.log(raw);
let lines = raw.split('\n');
console.log(lines);
const wtf = new TextEncoder();
for (let i = 0; i < lines.length; i++){
    console.log(wtf.encode(lines[i]));
}

// Array.from(uint8array)