{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.nodePackages.npm
  ];

  shellHook = ''
    export PATH=$PATH:./node_modules/.bin
  '';
}

