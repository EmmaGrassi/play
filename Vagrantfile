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
  SHELL

  config.vm.provision :docker
  config.vm.provision :docker_compose, yml: '/vagrant/docker-compose.yml', rebuild: true, run: 'always'
end
