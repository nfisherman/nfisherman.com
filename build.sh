#!/usr/bin/env bash

# This program is free software. It comes without any warranty, to
# the extent permitted by applicable law. You can redistribute it
# and/or modify it under the terms of the Do What The Fuck You Want
# To Public License, Version 2, as published by Sam Hocevar. See
# http://www.wtfpl.net/ for more details.

if ! command -v tar > /dev/null; then
    echo "tar: command not found"
    exit 1
fi
if ! command -v node > /dev/null; then
    echo "node: command not found"
    exit 1
fi


__NAME__=$(basename "$0")
function print_help() {
    echo "Usage: ./$__NAME__ [-o /path/to/output] [-s /path/to/source]
    
    Required Arguments:
        -v, --version       reported version number

    Options:
        -h, --help          prints this message
        -o, --output        directory to output build
        -s, --source        directory to build from
    "
}

VALID_ARGS=$(getopt -n $(basename "$0") -o hv:o:s: \
    --long help,version:,output:,source: -- "$@")
if [[ $? -ne 0 ]]; then
    print_help
    exit 1
fi

OUTPUT="release"
SOURCE="dist"
eval set -- "$VALID_ARGS"
while [ : ]; do
    case "$1" in
        -h | --help) 
            print_help
            exit
            ;;
        -v | --version) 
            VERSION="$2"
            shift 2
            ;;
        -o | --output)
            OUTPUT="$2"
            shift 2
            ;;
        -s | --source)
            SOURCE="$2"
            shift 2
            ;;
        :)
            echo -e "Option requires an argument."
            print_help
            exit 1
            ;;
        ?)
            echo -e "Invalid command option."
            print_help
            exit 1
            ;;
        --) shift;
            break
            ;;
    esac
done

if [[ "$VERSION" == "" ]]; then
    echo -e "version (-v, --version) is a required argument"
    print_help
    exit 1
fi

VERSION=$(echo "$VERSION" | sed 's/v*//' -)
OUTPUT=$(echo "$OUTPUT" | sed 's/\/*$//' -)
SOURCE=$(echo "$SOURCE" | sed 's/\/*$//' -)
fullpath="$OUTPUT/v$VERSION/nfisherman-website.tar.gz"

mkdir -p "$OUTPUT/v$VERSION" \
|| { echo "[FATAL] You do not have access to $OUTPUT."; exit 1; }

rm -rf "$SOURCE"
npx @11ty/eleventy

cat > "$SOURCE/copyright.html" <<EOF
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>copyright.txt - nfisherman</title>
    </head>
    <body>
        <main>
            <a href="/" style="margin-bottom: 10px;">◂ home</a>
<div><pre>$(cat copyright | sed 's/site\///' - | sed 's/</\&lt/' - )</pre></div>
        <a href="https://github.com/nfisherman/nfisherman.com">source</a>
        </main>
        
        <style>
            body { background-image: url('/asset/img/background/gmcbg.gif'); }
            main { font-family: monospace; background: white; border: 1px solid black; 
                   color: black; max-width: 600px; padding: 10px; }
             div { background: #BDBDBD; border: 1px solid black; white-space: pre-wrap;
                   padding: 10px; }
        </style>
    </body>
</html>
EOF
echo "$VERSION" > "$SOURCE/VERSION"

tar -czvf "$fullpath" -C "$SOURCE" .
sha256sum "$fullpath" \
| sed "s/${OUTPUT}\/v${VERSION}\///" > "$fullpath.DIGESTS"

echo "
files built:
$(pwd)/$fullpath         <- main archive
$(pwd)/$fullpath.DIGESTS <- SHA256 hash"
