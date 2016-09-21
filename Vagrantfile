Vagrant.configure(2) do |config|
  # TODO: Use the latest LTS version?
  config.vm.box = "ubuntu/trusty64"

  #config.vm.network "forwarded_port", guest: 80,   host: 8080
  #config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.network "public_network"

  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = false

    # Customize the amount of memory on the VM:
    vb.memory = "2048"
  end

  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update;
    sudo apt-get upgrade -y;

    # Docker Engine
    sudo apt-get install apt-transport-https ca-certificates;
    sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
    "deb https://apt.dockerproject.org/repo ubuntu-trusty main" >> /etc/apt/sources.list.d/docker.list;
    sudo apt-get update;
    sudo apt-get purge lxc-docker;
    sudo apt-get install docker-engine;

    # Docker Compose
    sudo curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
  SHELL

  #config.vm.provision :docker
  #config.vm.provision :docker_compose, yml: '/vagrant/docker-compose.yml', rebuild: true, run: 'always'
end
