# Hosting a React Application on a Linode VPS and Connecting it to a GoDaddy Domain

## 1. Set Up Your Linode VPS
1. **Create a Linode instance**:  
   Log in to your Linode account and create a new instance (e.g., Ubuntu 22.04).

2. **Access your Linode via SSH**:  
   After the Linode is up, connect to it using SSH:
   ```bash
   ssh root@your-linode-ip-address

3. **Update the server**:
   ```bash
   sudo apt update && sudo apt upgrade -y

## 2. Install Node.js and Nginx
1. **Install Node.js**:
   ```bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

2. **Install Nginx**:
   ```bash
   sudo apt install nginx
   ```

## 3. Build and Deploy Your React App
1. **Build your React app**:
   On your local machine, run:
   ```bash
   npm run build
   ```

2. **Transfer files to your VPS**:
   Use scp to copy the build folder to your VPS:
   ```bash
   scp -r build/* root@your-linode-ip-address:/var/www/html
   ```

3. **Or if you are using git**:
   ```bash
   git clone your-repo-url
   cd your-repo-name
   npm run build
   cp -r build/* /var/www/html
   ```


3. **Adjust Nginx Configuration**:
   Edit the Nginx default config:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   Replace the content with this:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       
       root /var/www/html;
       index index.html index.htm;

       location / {
           try_files $uri /index.html;
       }
   }
   ```

4. **Restart Nginx**:
   ```bash
   sudo systemctl restart nginx
   ```

## 4. Set Up the Domain with GoDaddy
1. **Obtain your Linode IP address**:  
   You can find it in your Linode dashboard.

2. **Go to GoDaddy DNS settings**:  
   Log in to your GoDaddy account and navigate to your domain’s DNS management page.

3. **Add an A record**:  
   Type: A
   Name: @
   Value: Your Linode IP address
   TTL: 1 hour (or leave default)
   Save the DNS settings.

## 5. Optional: Set Up SSL with Let's Encrypt
1. **Install Certbot**:  
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain an SSL certificate**:  
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Auto-renew certificates**:  
   ```bash
   sudo certbot renew --dry-run
   ```

## 6. Final Steps
1. **Wait for DNS propagation**:  
   It may take a few minutes to a few hours for your DNS changes to propagate.

2. **Visit your domain**:  
   Verify the React app is served correctly.
