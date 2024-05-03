# Hardhat + Foundry

## Quick Start

### Install

```bash
bun install
forge install
```

### Compile

```bash
forge build
```

### Test

```bash
forge test
```

### Deploy

- Farmon

```bash
npx hardhat deploy:nft --network base_sepolia --base-uri "https://ipfs.io/ipfs/QmNuxKj4wmhcSjyjcFv7iej73PjggqYD1YdPNzB7SWR3xr?filename=" --category 3 --free-mint-duration 2426615
```

- Farmon Token

```bash
npx hardhat deploy:token --network base_sepolia --initial-owner "0xA7b547061cA0324BD3357C3bcb01A71071E52E8E" --minter "0xA7b547061cA0324BD3357C3bcb01A71071E52E8E"
```

## Check Contract

### Install

```bash
poetry shell
poetry install
```

### Check Solc

```bash
solc-select install 0.8.23
```

- output

```bash
Installing solc '0.8.23'...
Version '0.8.23' installed.
```

### Run

```bash
slither contracts

# or

slither contracts/HardhatFoundryERC721.sol
```


## Contract

| Contract | Contract Address | Explorer Link |
| --- | --- | --- |
| Farmon | `0x40AcB0E5E5BA146fDb7D124fd00cF55C8A9EE9d6` | [Blockscout](https://base-sepolia.blockscout.com/address/0x40AcB0E5E5BA146fDb7D124fd00cF55C8A9EE9d6) |
| Farmon Token | `0xAA6053631ce6A48c63Cc94dB80cE03F26211403a` | [Blockscout](https://base-sepolia.blockscout.com/address/0xAA6053631ce6A48c63Cc94dB80cE03F26211403a) |
