FROM oven/bun:1.1.37

# Install base dependencies
RUN apt-get update && \
	apt-get install -y \
	libpq-dev \
	curl \
	jq \
	git

# Set Sui version - you can override this during build if needed
ARG SUI_VERSION=testnet-v1.39.1

# Download and install Sui using the same approach as GitHub Action
RUN curl -L -o sui-${SUI_VERSION}-ubuntu-x86_64.tgz \
	https://github.com/MystenLabs/sui/releases/download/${SUI_VERSION}/sui-${SUI_VERSION}-ubuntu-x86_64.tgz && \
	mkdir -p sui-binaries && \
	tar -xvf sui-${SUI_VERSION}-ubuntu-x86_64.tgz -C sui-binaries && \
	rm -rf sui-${SUI_VERSION}-ubuntu-x86_64.tgz && \
	mv sui-binaries/sui /usr/local/bin/ && \
	rm -rf sui-binaries

# Setup the client.yaml for sui
RUN <<EOF bash
# Setup Sui environment
echo -e "y\n\n1" | sui client envs
# Create new wallet
sui client new-address secp256k1 wallet
# Switch to wallet
sui client switch --address wallet
EOF

# Verify installation
RUN sui --version

WORKDIR /app
COPY . .

# Install dependencies
RUN bun install

RUN <<EOF bash
cd node_modules/@axelar-network/axelar-cgp-sui/move/interchain_token
# To clone all the dependencies
sui move build
EOF

# Build the executable file
RUN bun run build

RUN chmod +x server

CMD ["bun", "start"]
