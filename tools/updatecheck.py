#!/usr/bin/env python3

# Copyright © 2024 Cedar Lehman <ca.lehman05@gmail.com>
# This program is free software. It comes without any warranty, to
# the extent permitted by applicable law. You can redistribute it
# and/or modify it under the terms of the Do What The Fuck You Want
# To Public License, Version 2, as published by Sam Hocevar. See
# http://www.wtfpl.net/ for more details.

"""This module contains a function and command-line interface for
obtaining the latest release tag from a GitHub repository.
"""

import argparse
import requests
import sys
from urllib.parse import urlparse

__version__ = '1.1'
__author__ = 'Cedar Lehman'
__contact__ = 'ca.lehman05@gmail.com'


def get_ver(repo: str, key: str = None):
    """Return the release tag of the latest release in the given repo.
    Optionally, include a key to authenticate with GitHub. Not
    including a key may result in the user being rate-limited.

    Args:
        repo:
            The GitHub repository to check the release tag(s) of.
        key:
            (optional) Key to use to authenticate with GitHub.

    Returns:
        The latest release tag (ex. 'v0.1').

    Raises:
        ValueError: If the repo provided is either:

            1. not a valid URL
            2. not a GitHub repo
    """
    # transform url to api url
    if repo.find('https://') == -1:
        repo = f'https://{repo}'
    repo = repo.replace('https://', 'https://api.')
    if repo[-1] != '/':
        repo += '/'
    repo = repo.replace('.com/', '.com/repos/', 1)
    repo = f'{repo}releases/latest'

    # validate url
    try:
        garbage = urlparse(repo)
        garbage1, garbage2 = garbage.scheme, garbage.netloc
    except AttributeError:
        raise ValueError('repo is not a valid url')
    if repo.find('https://api.github.com/') == -1:
        raise ValueError('repo is not a GitHub url')

    headers: dict[str, str] = {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    }
    if key:
        headers['Authorization'] = f'Bearer {key}'

    data = requests.get(repo, headers=headers).json()

    return data["tag_name"]


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Return the tag of the latest release from the given GitHub repository.'
    )
    parser.add_argument(
        '-v', '--version',
        action='version',
        version=f'v{__version__}'
    )
    parser.add_argument(
        '-k', '--key',
        help='key to use to authenticate with GitHub'
    )
    parser.add_argument(
        'repo',
        help='the GitHub repository to check the release tag(s) of'
    )

    args = parser.parse_args()
    print(get_ver(args.repo, args.key), file=sys.stdout)
