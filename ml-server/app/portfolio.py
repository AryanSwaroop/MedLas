import os
import pandas as pd
import chromadb
import uuid
from chains import Chain
from langchain_community.document_loaders import WebBaseLoader
from utils import clean_text
from dotenv import load_dotenv

load_dotenv()


class Portfolio:

    def __init__(self, file_path=str(os.getenv("File_Link"))):
        self.file_path = file_path  # Save the path to the portfolio CSV file
        self.data = pd.read_csv(file_path)  # Load the portfolio data from the CSV file into a pandas DataFrame
        self.chroma_client = chromadb.PersistentClient("vectorstore")  # Initialize a persistent ChromaDB client
        self.collection = self.chroma_client.get_or_create_collection(name="treatments")  # Create or fetch a collection

    def find_linkData(self, link):
        chain = Chain()
        loader = WebBaseLoader([link])
        loaded_data = loader.load()
        if not loaded_data:
            return None
        page_content = clean_text(loaded_data[0].page_content)
        return chain.extract_link(page_content)

    def load_portfolio(self):
        if not self.collection.count():
            for _, row in self.data.iterrows():
                self.collection.add(documents=row["Treatments"],
                                    metadatas={"links": row["Links"]},
                                    ids=[str(uuid.uuid4())])

    def query_links(self, treatment):
        results = self.collection.query(query_texts=[treatment], n_results=2)
        return results.get("metadatas", [])
