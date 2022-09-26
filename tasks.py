import subprocess
import pathlib
import sys

from invoke import task

import known

def get_files_to_check():
    """
    A generator that returns paths of latex files.

    Note that this could be extended to yield other files as necessary.
    """
    for path in pathlib.Path("tex/").glob("*.tex"):
        yield path


@task
def spellcheck(c):
    """
    Run the book through a spell checker.

    Known exceptions are in `known.py`
    """
    exit_code = 0

    for tex_path in get_files_to_check():

        tex = tex_path.read_text()
        aspell_output = subprocess.check_output(
            ["aspell", "-t", "--list", "--lang=en_GB"], input=tex, text=True
        )
        incorrect_words = set(aspell_output.split("\n")) - {""} - known.words
        if len(incorrect_words) > 0:
            print(f"In {tex_path} the following words are not known: ")
            for string in sorted(incorrect_words):
                print(string)
            exit_code = 1

    sys.exit(exit_code)