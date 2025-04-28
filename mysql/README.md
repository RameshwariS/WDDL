### MySQL Server and MySQL Workbench on Ubuntu
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install mysql-server

# Check MySQL service status
sudo systemctl status mysql

# Secure MySQL Installation (Set root password, remove insecure settings)
sudo mysql_secure_installation

# Install dependencies for MySQL Workbench
sudo apt install wget

# Download and install MySQL APT repository
wget https://dev.mysql.com/get/mysql-apt-config_0.8.17-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.17-1_all.deb

# Update the package index
sudo apt update

# Install MySQL Workbench
sudo apt install mysql-workbench
