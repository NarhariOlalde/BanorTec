import os
# import boto3

# IBM client
# import ibm_boto3
# from ibm_botocore.client import Config

# Setup IBM cloud object storage
# COS_ENDPOINT = "cos://us-south/danielcustommodel-donotdelete-pr-wkzwnxz3qrox3j/"
# COS_API_KEY_ID = "bylsPMhEbxXR55OAxSzuZohYlzmqeTaSvpORMGhTwtZT"
# COS_INSTANCE_CRN = "crn:v1:bluemix:public:cloud-object-storage:global:a/4adbfdc681b3f2442de266f31c7da19a:fcdc4de9-6a7b-457b-bcc4-50e063663208:bucket:danielcustommodel-donotdelete-pr-wkzwnxz3qrox3j"
# COS_AUTH_ENDPOINT = "https://iam.cloud.ibm.com/oidc/token"
# COS_BUCKET = "danielcustommodel-donotdelete-pr-wkzwnxz3qrox3j"
# Create a client
# cos = ibm_boto3.client(
#     "s3",
#     ibm_api_key_id=COS_API_KEY_ID,
#     ibm_service_instance_id=COS_INSTANCE_CRN,
#     ibm_auth_endpoint=COS_AUTH_ENDPOINT,
#     config=Config(signature_version="oauth"),
#     endpoint_url=COS_ENDPOINT
# )

# Connection to AWS 
AWS_BUCKET_NAME="practicantesbucket"
AWS_ACCESS_KEY="AKIA4BO45WH2U5NOA4WX"
AWS_SECRET_ACCESS_KEY="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"
AWS_DOMAIN="http://practicantesbucket.s3.amazonaws.com/"
AWS_REGION_NAME="us-east-1"

# # Create an S3 client
# cos = boto3.client(
#     's3',
#     aws_access_key_id=AWS_ACCESS_KEY,
#     aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
#     region_name=AWS_REGION_NAME
# )

# def upload_image(buf, filename):
#     # Use the IBM Cloud Object Storage client (or any other client) to upload the buffered image
#     try:
#         # Assuming you're using the IBM Cloud Object Storage client and the 'cos' client is initialized
#         cos.upload_fileobj(buf, AWS_BUCKET_NAME, filename)
#         return True
#     except Exception as e:
#         print(f"Error uploading file: {e}")
#         return False