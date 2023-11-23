//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract Shipment {
    // ----------> LOGIN SIGNUP PART
    uint256 public IDm=1;
    uint256 public IDd=1;
    uint256 public IDr=1;
    uint256 public shipmentid = 1;
    struct Manufacturer {
        uint256 IDmanu;
        string name;
        address add;
        string phoneNumber;
        string companyname;
        bool registered;
    }

    struct Distributer {
        uint256 IDdis;
        string name;
        address add;
        string phoneNumber;
        string verificationLink;
        bool registered;
    }

    struct Retailer {
        uint256 IDmanu;
        string name;
        address add;
        string phoneNumber;
        string verificationLink;
        bool registered;
    }
    Manufacturer[] private manufacturers;
    mapping(address => bool) public manufacRegis;
    mapping(address => uint) public manufacRegisid;

    Distributer[] private distributers;
    mapping(address => bool) public distriRegis;
    mapping(address => uint) public distriRegisid;

    Retailer[] private retailers;
    mapping(address => bool) public retailRegis;
    mapping(address => uint) public retailRegisid;

    function registerManufacturer(
        string memory _name,
        string memory _phno,
        string memory _companyname
    ) public {
        require(
            manufacRegis[msg.sender] == false,
            "already registered as manufacturer"
        );
        manufacturers.push(
            Manufacturer(IDm, _name, msg.sender, _phno, _companyname, true)
        );
        manufacRegis[msg.sender] = true;
        manufacRegisid[msg.sender] = IDm;
        IDm++;
    }

    function registerDistributer(
        string memory _name,
        string memory _verification,
        string memory _phno
    ) public {
        require(
            distriRegis[msg.sender] == false,
            "already registered as retailer"
        );
        distributers.push(
            Distributer(IDd, _name, msg.sender, _phno, _verification, true)
        );
        distriRegis[msg.sender] = true;
        distriRegisid[msg.sender] = IDd;
        IDd++;
    }

    function registerRetailer(
        string memory _name,
        string memory _verification,
        string memory _phno
    ) public {
        require(
            retailRegis[msg.sender] == false,
            "already registered as distributer"
        );
        retailers.push(
            Retailer(IDr, _name, msg.sender, _phno, _verification, true)
        );
        retailRegis[msg.sender] = true;
        retailRegisid[msg.sender] = IDr;
        IDr++;
    }

    function existmanu() view public returns(bool){
        return manufacRegis[msg.sender];
    }

    function exisdistri() view public returns(bool){
        return distriRegis[msg.sender];
    }

    function existretail() view public returns(bool){
        return retailRegis[msg.sender];
    }

    // ----------->shipment relation
    mapping(address => uint256[]) public manushipment;
    mapping(address => uint256[]) public distrishipment;
    mapping(address => uint256[]) public retailshipment;

    //----------------------------------------------------------
    //----------------------------------------------------------

    function showdistributershipment(address _address) public view returns(uint[] memory){
        return distrishipment[_address];
    }

    function showmanufactshipment(address _address) public view returns(uint[] memory){
        return manushipment[_address];
    }

    function showretailershipment(address _address) public view returns(uint[] memory){
        return retailshipment[_address];
    }


    //----------------------------------------------------------
    struct shipment {
        uint256 id;
        Manudetail manudetails;
        Distridetail distridetails;
        Retaildetail retaildetails;
    }
    shipment[] public shipments;

    struct Manudetail {
        uint256 ID;
        address add;
        string name;
        uint256 phno;
        string companyname;
    }

    struct Distridetail {
        uint256 ID;
        address add;
        string name;
        uint256 phno;
        uint256 price;
        bool inicondition;
    }

    struct Retaildetail {
        uint256 ID;
        address add;
        string name;
        uint256 phno;
        uint256 price;
        bool inicondition;
    }

    function payToManufacturer(uint _shipmentid) public payable {
        require(distriRegis[msg.sender] == true, "you must be a distributer");
        require(
            msg.value >= shipments[_shipmentid].distridetails.price,
            "please pay the sufficient amount"
        );
        uint amount = shipments[_shipmentid].distridetails.price;
        payable(address(this)).transfer(amount);
    }

    function createShipment(
        string memory _manuName,
        uint256 _manuPhNo,
        string memory _manuCompanyName,
        address _distriAddress,
        string memory _distriName,
        uint256 _distriPhNo,
        uint256 _distriPrice,
        bool _distriInCondition
    ) public {
        require(
            manufacRegis[msg.sender] == true,
            "you must be a manufacturer to start shipment"
        );
        shipment memory newShipment;
        newShipment.id = shipmentid;
        newShipment.manudetails = Manudetail(
            manufacRegisid[msg.sender],
            msg.sender,
            _manuName,
            _manuPhNo,
            _manuCompanyName
        );
        newShipment.distridetails = Distridetail(
            distriRegisid[_distriAddress],
            _distriAddress,
            _distriName,
            _distriPhNo,
            _distriPrice,
            _distriInCondition
        ); 
        newShipment.retaildetails = Retaildetail(
            0,
            address(0),
            "",
            0,
            0,
            false
        );
        shipments.push(newShipment);
        manushipment[msg.sender].push(shipmentid);
        distrishipment[_distriAddress].push(shipmentid);
        shipmentid++;
    }

    mapping (uint => bool) manu_distri;

    function recievedbydistri(uint _id) public {
        manu_distri[_id] = true;
    }

    function withdrawFundsByManufacturer(uint _shipmentid) public payable {
        require(manufacRegis[msg.sender] == true, "you must be a manufacturer");
        require(manu_distri[_shipmentid],"shipment not recieved yet");
        uint256 amount = shipments[_shipmentid].distridetails.price;
        payable(msg.sender).transfer(amount);
    }

    function withdrawback1(uint _shipmentid) public payable{
        require(distriRegis[msg.sender] == true,
            "you must be a distributer to continue furthur");
        require(manu_distri[_shipmentid],"shipment not recieved yet");
        //oracle ka function call hoga 
        //if false aaya toh hi kar sakte hai
    }

    function distritoretail(
        uint _shipmentid,
        address _retailAddress,
        string memory _retailName,
        uint256 _retailPhNo,
        uint256 _retailPrice,
        bool _retailInCondition
    )public {
        require(
            distriRegis[msg.sender] == true,
            "you must be a distributer to continue furthur"
        );
        shipments[_shipmentid].retaildetails = Retaildetail(retailRegisid[_retailAddress], _retailAddress, _retailName, _retailPhNo, _retailPrice, _retailInCondition);
    }

    function payTodistributer(uint _shipmentid) public payable {
        require(distriRegis[msg.sender] == true, "you must be a distributer");
        require(
            msg.value >= shipments[_shipmentid].retaildetails.price,
            "please pay the sufficient amount"
        );
        uint amount = shipments[_shipmentid].retaildetails.price;
        payable(address(this)).transfer(amount);
    }

    mapping (uint => bool) distri_retailer;

    function recievedbyretailer(uint _id) public {
        distri_retailer[_id] = true;
    }

    function withdrawFundsByDistributer(uint _shipmentid) public payable {
        require(retailRegis[msg.sender] == true, "you must be a retailer");
        require(distri_retailer[_shipmentid],"shipment not recieved yet");
        uint256 amount = shipments[_shipmentid].retaildetails.price;
        payable(msg.sender).transfer(amount);
    }

    function withdrawback2(uint _shipmentid) public payable{
        require(retailRegis[msg.sender] == true,
            "you must be a retailer");
        require(distri_retailer[_shipmentid],"shipment not recieved yet");
        //oracle ka function call hoga 
        //if false aaya toh hi kar sakte hai
    }
    //----------------------------------> show shipment

    function shipmentlist() public view returns(shipment[] memory){
        return shipments;
    }

    function showshipment(uint _shipmentid) public view returns(shipment memory){
        return shipments[_shipmentid-1];
    }
}


//