from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from .database import engine, SessionLocal, Base
from .models import Article
from .scraper import scrape_oldest_articles
from .schemas import ArticleCreate, ArticleResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Phase 1 API")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Populate DB on startup
@app.on_event("startup")
def startup_populate():
    db = SessionLocal()
    articles = scrape_oldest_articles()
    for a in articles:
        exists = db.query(Article).filter(Article.url == a["url"]).first()
        if not exists:
            db.add(Article(title=a["title"], url=a["url"]))
    db.commit()
    db.close()

# CRUD Endpoints
@app.get("/articles", response_model=list[ArticleResponse])
def read_articles(db: Session = Depends(get_db)):
    return db.query(Article).all()

@app.get("/articles/{article_id}", response_model=ArticleResponse)
def read_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@app.post("/articles", response_model=ArticleResponse)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    exists = db.query(Article).filter(Article.url == article.url).first()
    if exists:
        raise HTTPException(status_code=400, detail="Article already exists")
    article_obj = Article(title=article.title, url=article.url)
    db.add(article_obj)
    db.commit()
    db.refresh(article_obj)
    return article_obj

@app.put("/articles/{article_id}", response_model=ArticleResponse)
def update_article(article_id: int, new_article: ArticleCreate, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    article.title = new_article.title
    article.url = new_article.url
    db.commit()
    db.refresh(article)
    return article

@app.delete("/articles/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    db.delete(article)
    db.commit()
    return {"detail": "Article deleted"}

@app.get("/test-scrape")
def test_scrape():
    return scrape_oldest_articles()
