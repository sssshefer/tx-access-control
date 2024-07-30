# Transaction Access Control
The `tx-access-control` project implements a role-based access control system in Solidity, complete with accompanying tests. This project serves as a basic implementation, while more advanced versions can be found on the OpenZeppelin website.

## Table of Contents

- [Transaction Access Control](#transaction-access-control)
- [Features and Functionality](#features-and-functionality)
- [Theory Notes](#theory-notes)
  - [AAA Concepts in a Blockchain](#aaa-concepts-in-a-blockchain)
    - [Authentication](#authentication)
    - [Authorization](#authorization)
    - [Accounting](#accounting)
- [Implementation](#implementation)
  - [Contract Overview](#contract-overview)
  - [Tests](#tests)
- [Running the Project Locally](#running-the-project-locally)
  
## Features and Functionality

- **Role Management:** Define and manage different roles with specific permissions.
- **Role Assignment:** Grant and revoke roles to different accounts.
- **Access Control:** Enforce role-based restrictions on various contract functions.
- **Admin Roles:** Support for hierarchical role administration.
- 
## Theory Notes

### AAA concepts in a Blockchain
In the context of blockchain, particularly with Solidity-based smart contracts, authentication, authorization, and accounting (AAA) are critical concepts for ensuring security and proper access control.

#### Authentication
Authentication is inherently handled by the blockchain network, where each user's identity is linked to their unique cryptographic address. This cryptographic identity is established through the use of private-public key pairs. When a user interacts with a smart contract, they sign transactions with their private key, which can be verified by others using the corresponding public key. This ensures that the transactions are indeed initiated by the owner of the address, providing a secure and decentralized method of authentication without relying on central authorities.

#### Authorization 
Authorization is implemented through role-based access control (RBAC) within the smart contracts. Specific roles with distinct permissions are defined, and functions are restricted to certain roles using Solidity's modifiers. For example, only users with the MINTER_ROLE can mint tokens, and only those with the WITHDRAWER_ROLE can withdraw funds.

#### Accounting 
Accounting involves logging events that capture key actions and changes within the contracts. Events such as RoleGranted, RoleRevoked, and RoleAdminChanged are emitted to provide an auditable trail of all role assignments and modifications, ensuring transparency and accountability. This AAA framework is essential for creating secure and efficient decentralized applications (dApps) on the Ethereum blockchain.

## Implementation

### Contract Overview

The project includes three main contracts:

1. **IAccessControl.sol:** Interface defining events and essential functions for role management.
2. **AccessControl.sol:** Abstract contract implementing the core RBAC functionality.
3. **Demo.sol:** Example contract demonstrating the use of `AccessControl` to manage minting and withdrawing functions.

### Tests

The project includes a test suite to verify the correct implementation and functionality of the access control system. The tests cover:

- Deployment and role hierarchy verification.
- Initial role-based permissions.
- Dynamic role assignment and subsequent action permissions.

## Running the Project Locally

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/sssshefer/tx-access-control.git
    cd tx-access-control
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Compile the contracts:**
    ```sh
    npx hardhat compile
    ```

4. **Run the tests:**
    ```sh
    npx hardhat test
    ```

By following these steps, you can explore and extend the functionality of the `tx-access-control` project to fit your needs.

*** Happy hacking ***
