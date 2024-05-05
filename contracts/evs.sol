//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

contract ElectionCreation {
    address[] public deployedBallots;

    function startElection(
        string[][] memory candidates,
        string[][] memory parties,
        string[] memory districts
    ) public {
        for (uint i = 0; i < districts.length; i++) {
            Ballot newBallot = new Ballot(candidates[i], parties[i], districts[i], msg.sender);
            deployedBallots.push(address(newBallot));
        }
    }

    function getDeployedBallots() public view returns (address[] memory) {
        return deployedBallots;
    }
}

contract Ballot {
    struct Candidate {
        string name;
        string party;
        uint voteCount;
        uint creationDate;
        uint expirationDate;
    }

    Candidate[] public candidates;
    address public manager;
    string public votingDistrict;
    mapping(address => bool) public voters;
    bool public electionStarted;
    address[] public votersList;

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    modifier onlyAfterStart() {
        require(electionStarted, "Election has not started yet");
        _;
    }

    constructor(
        string[] memory candidateNames,
        string[] memory candidateParties,
        string memory district,
        address creator
    ) {
        manager = creator;
        votingDistrict = district;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                party: candidateParties[i],
                voteCount: 0,
                creationDate: block.timestamp,
                expirationDate:0
            }));
        }
    }

    function startVoting(uint amountOfHours) public restricted {
    electionStarted = true;
    // Update expirationDate for all candidates
    for (uint i = 0; i < candidates.length; i++) {
        candidates[i].expirationDate =amountOfHours; 
    }
    }


    function vote(uint index) public onlyAfterStart {
        require(!voters[msg.sender], "You have already voted");
        candidates[index].voteCount += 1;
        voters[msg.sender] = true;
        votersList.push(msg.sender);
        
    }

    function getCandidateName(uint index) public view returns (string memory) {
        return candidates[index].name;
    }

    function getCandidateParty(uint index) public view returns (string memory) {
        return candidates[index].party;
    }

    function getVoteCount(uint index) public view returns (uint) {
        return candidates[index].voteCount;
    }

    function getVotersList() public view  returns(address[] memory) {
        return votersList;
    }
}
