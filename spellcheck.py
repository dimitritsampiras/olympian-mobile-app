import subprocess
import sys
import pathlib

known_words=set(open('dictionary.txt', 'r').readlines())
"""
Run the book through a spell checker.

Known exceptions are in `known.py`
"""
exit_code = 0

files_to_check = [pathlib.Path(p) for p in sys.argv[1:]] # Cut off script name

for tex_path in files_to_check:

    tex = tex_path.read_text()
    aspell_output = subprocess.check_output(
        ["aspell", "-t", "--list", "--lang=en_US"], input=tex, text=True
    )
    incorrect_words = set(aspell_output.split("\n")) - {""} - known_words
    if len(incorrect_words) > 0:
        print(f"In {tex_path} the following words are not known: ")
        for string in sorted(incorrect_words):
            print(string)
        exit_code = 1

sys.exit(exit_code)
