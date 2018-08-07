EOSIOCPP = eosiocpp

build : users token marketplace

token :
	$(EOSIOCPP) -o ./src/contracts/Token.wast ./src/contracts/Token.cpp 

marketplace :
	$(EOSIOCPP) -o ./src/contracts/Marketplace.wast ./src/contracts/Marketplace.cpp && \
		$(EOSIOCPP) -g ./src/contracts/Marketplace.abi ./src/contracts/Marketplace.cpp

users :
	$(EOSIOCPP) -o ./src/contracts/Users.wast ./src/contracts/Users.cpp && \
		$(EOSIOCPP) -g ./src/contracts/Users.abi ./src/contracts/Users.cpp
		
clean :
	-find . -type f \( -name '*.wasm' -o -name '*.wast' -o -name '*.abi' -a ! -name Token.abi \) -exec rm {} +
